package companyservice

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
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
