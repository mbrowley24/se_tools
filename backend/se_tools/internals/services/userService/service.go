package userservice

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/optionsDto"
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

func (s *Service) FindByUsername(ctx context.Context, username string) (appUser.User, error) {

	var user appUser.User

	filter := bson.M{"username": username}

	println("here")
	if err := s.collection.FindOne(ctx, filter).Decode(&user); err != nil {

		println(err.Error())
		return user, err
	}

	return user, nil
}

func (s *Service) SaleEngineerOption(se appUser.User) optionsdto.Option {

	var option optionsdto.Option

	option.Value = se.PublicId
	option.Name = fmt.Sprintf("%s %s", se.FirstName, se.LastName)

	return option
}
