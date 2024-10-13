package userservice

import (
	"context"
	"fmt"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/optionsDto"
	"se_tools/internals/repository"
	"se_tools/utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Service struct {
	Collection repository.Collection
	Utils      utils.Utilities
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

func (s *Service) SaleEngineerOption(se appUser.User) optionsdto.Option {

	var option optionsdto.Option

	option.Value = se.PublicId
	option.Name = fmt.Sprintf("%s %s", se.FirstName, se.LastName)

	return option
}
