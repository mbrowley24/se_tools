package userservice

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"se_tools/internals/models/appUser"
	"se_tools/utils"
)

type Service struct {
	collection *mongo.Collection
	utils      *utils.Utilities
}

func StartService(collection *mongo.Collection, utils *utils.Utilities) *Service {

	return &Service{collection: collection, utils: utils}

}

func (s *Service) CheckEmail(ctx context.Context, db *mongo.Database, email string) (bool, error) {

	filter := bson.M{"email": email}

	count, err := s.collection.CountDocuments(ctx, filter)

	if err != nil {
		return false, err
	}

	return count > 0, nil

}

func (s *Service) FilterId(id primitive.ObjectID) bson.M {
	return bson.M{"_id": id}
}

func (s *Service) FilterPublicId(publicId string) bson.M {
	return bson.M{"public_id": publicId}
}

func (s *Service) FindByUsername(ctx context.Context, username string) (appUser.User, error) {

	var user appUser.User

	filter := bson.M{"username": username}

	if err := s.collection.FindOne(ctx, filter).Decode(&user); err != nil {

		return user, err
	}

	return user, nil
}

func (s *Service) UpdateUser(ctx context.Context, filter, update bson.M, options options.UpdateOptions) (*mongo.UpdateResult, error) {

	result, err := s.collection.UpdateOne(ctx, filter, update, &options)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s *Service) FindUser(ctx context.Context, filter bson.M, opts *options.FindOneOptions) *mongo.SingleResult {

	return s.collection.FindOne(ctx, filter, opts)
}
