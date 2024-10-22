package companyservice

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"se_tools/internals/models/company"
	"se_tools/utils"

	"go.mongodb.org/mongo-driver/mongo"
)

type Service struct {
	collection *mongo.Collection
	utils      *utils.Utilities
}

// Start starts user service
func Start(collection *mongo.Collection, utils *utils.Utilities) *Service {

	return &Service{
		collection: collection,
		utils:      utils,
	}
}

func (s *Service) FilterForSalesEngineer(id primitive.ObjectID) bson.M {

	return bson.M{"sales_engineer._id": id}
}

func (s *Service) FilterDTO(matchFilter bson.D, limit, skip int, sort string) mongo.Pipeline {

	return mongo.Pipeline{
		{{"$match", matchFilter}},
		{
			{
				"$lookup", bson.D{
					{"from", "users"},                    // The collection to join
					{"localField", "sales_engineer._id"}, // The field from 'companies'
					{"foreignField", "_id"},              // The field from 'user aka sales eng'
					{"as", "sales_engineer_info"}},       // Output array field
			},
		},
		{
			{Key: "$unwind", Value: bson.D{
				{Key: "path", Value: "$sales_engineer_info"},
				{Key: "preserveNullAndEmptyArrays", Value: true},
			}},
		},
		{
			{
				"$lookup", bson.D{
					{"from", "users"},
					{"localField", "coverage_se._id"},
					{"foreignField", "_id"},
					{"as", "coverage_se_info"}},
			},
		},
		{
			{
				"$lookup", bson.D{
					{"from", "users"},
					{"localField", "created_by._id"},
					{"foreignField", "_id"},
					{"as", "created_by_info"}},
			},
		},
		{
			{
				"$lookup", bson.D{
					{"from", "sales_reps"},
					{"localField", "sales_rep._id"},
					{"foreignField", "_id"},
					{"as", "sales_rep_info"}},
			},
		},
		{
			{Key: "$sort", Value: bson.D{
				{Key: sort, Value: 1}}},
		},
		{
			{Key: "$skip", Value: skip},
		},
		{
			{Key: "$limit", Value: limit},
		},
		{
			{Key: "$unwind", Value: bson.D{
				{Key: "path", Value: "$sales_reps"},
				{Key: "preserveNullAndEmptyArrays", Value: true}},
			},
		},
	}
}

func (s *Service) FilterPublicId(publicId string) bson.M {

	return bson.M{"public_id": publicId}
}

func (s *Service) FindCompanies(ctx context.Context, filter bson.M, opts *options.FindOptions) (*mongo.Cursor, error) {

	results, err := s.collection.Find(ctx, filter, opts)

	if err != nil {
		return results, err
	}

	return results, nil
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

func (s *Service) Save(ctx context.Context, model company.Model) (*mongo.InsertOneResult, error) {

	result, err := s.collection.InsertOne(ctx, model)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s *Service) Pipeline(ctx context.Context, pipeline mongo.Pipeline, opts *options.AggregateOptions) (*mongo.Cursor, error) {

	if results, err := s.collection.Aggregate(ctx, pipeline, opts); err != nil {
		return nil, err
	} else {
		return results, nil
	}

}
