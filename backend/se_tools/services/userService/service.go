package userservice

import (
	"context"
	"se_tools/repository"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Service struct {
	Collection repository.Collection
}

func (s *Service) CheckEmail(ctx context.Context, db *mongo.Database, email string) (bool, error) {

	collection := db.Collection(s.Collection.Users())

	filter := bson.M{"email": email}

	count, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return false, err
	}

	return count > 0, nil

}
