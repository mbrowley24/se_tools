package companyservice

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
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

func (s *Service) FindCompanies(ctx context.Context, filter bson.M, opts *options.FindOptions) (*mongo.Cursor, error) {

	results, err := s.collection.Find(ctx, filter, opts)

	if err != nil {
		return results, err
	}

	return results, nil
}
