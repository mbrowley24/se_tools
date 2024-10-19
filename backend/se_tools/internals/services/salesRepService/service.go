package salesrepservice

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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
