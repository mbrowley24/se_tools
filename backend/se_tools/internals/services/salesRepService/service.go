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

func (s *Service) FindSalesReps(ctx context.Context, filter bson.M, opts *options.FindOptions) (*mongo.Cursor, error) {

	result, err := s.collection.Find(ctx, filter, opts)

	if err != nil {
		return nil, err
	}

	return result, err
}
