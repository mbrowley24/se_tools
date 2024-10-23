package salesrepservice

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"se_tools/internals/models/salesrep"
	"se_tools/utils"
)

type Service struct {
	collection *mongo.Collection
	utils      *utils.Utilities
}

func Start(collection *mongo.Collection, utils *utils.Utilities) *Service {

	return &Service{
		collection: collection,
		utils:      utils,
	}
}

func (s *Service) FilterSalesEngineerId(id primitive.ObjectID) bson.M {

	return bson.M{"sales_engineer_id": id}
}
func (s *Service) FilterPublicId(publicId string) bson.M {

	return bson.M{"public_id": publicId}
}

func (s *Service) FindSalesReps(ctx context.Context, filter bson.M, opts *options.FindOptions) (*mongo.Cursor, error) {

	result, err := s.collection.Find(ctx, filter, opts)

	if err != nil {
		return nil, err
	}

	return result, err
}

func (s *Service) FindSalesRep(ctx context.Context, filter bson.M, opts *options.FindOneOptions) *mongo.SingleResult {

	return s.collection.FindOne(ctx, filter, opts)

}

func (s *Service) GeneratePublicId(ctx context.Context) (string, error) {

	publicId := s.utils.RandomStringGenerator(30)

	for {

		filter := s.FilterPublicId(publicId)

		count, err := s.collection.CountDocuments(ctx, filter)

		if err != nil {
			return "", err
		}

		if count == 0 {
			break
		}

		publicId = s.utils.RandomStringGenerator(30)
	}

	return publicId, nil
}

func (s *Service) InsertOne(ctx context.Context,
	model salesrep.Model,
	opts *options.InsertOneOptions) (*mongo.InsertOneResult, error) {

	inserted, err := s.collection.InsertOne(ctx, model, opts)

	if err != nil {
		return nil, err
	}

	return inserted, nil
}

func (s *Service) FilterDTO(matchFilter bson.D) mongo.Pipeline {

	return mongo.Pipeline{
		{
			{"$match", matchFilter},
		},
		{
			{
				"$lookup", bson.D{
					{"from", "users"},
					{"localField", "sales_engineer._id"},
					{"foreignField", "_id"},
					{"as", "sales_engineer"}},
			},
		},
		{
			{
				Key: "$unwind", Value: bson.D{
					{Key: "path", Value: "$sales_engineer"},
					{Key: "preserveNullAndEmptyArrays", Value: true}},
			},
		},
		{
			{
				Key: "$lookup", Value: bson.D{
					{Key: "from", Value: "users"},
					{Key: "localField", Value: "coverage_se._id"},
					{Key: "foreignField", Value: "_id"},
					{Key: "as", Value: "coverage_se"}},
			},
		},
		{
			{
				Key: "$unwind", Value: bson.D{
					{Key: "path", Value: "$coverage_se"},
					{Key: "preserveNullAndEmptyArrays", Value: true}},
			},
		},
		{
			{
				Key: "$lookup", Value: bson.D{
					{Key: "from", Value: "roles"},
					{Key: "localField", Value: "role._id"},
					{Key: "foreignField", Value: "_id"},
					{Key: "as", Value: "roles"}},
			},
		},
		{
			{
				Key: "$unwind", Value: bson.D{
					{Key: "path", Value: "$roles"},
					{Key: "preserveNullAndEmptyArrays", Value: true}},
			},
		},
	}
}

func (s *Service) PipeLineFilterJoinSalesEngineers() mongo.Pipeline {

	return mongo.Pipeline{
		{{"$lookup", bson.D{
			{"from", "users"},                    // The collection to join
			{"localField", "sales_engineer._id"}, // The field from 'salesRep'
			{"foreignField", "_id"},              // The field from 'user aka sales eng'
			{"as", "sales_engineer_info"},        // Output array field
		}}},
	}
}

func (s *Service) Pipeline(ctx context.Context, filter mongo.Pipeline, opts *options.AggregateOptions) (*mongo.Cursor, error) {

	cursor, err := s.collection.Aggregate(ctx, filter, opts)

	if err != nil {
		return nil, err
	}

	return cursor, nil
}
