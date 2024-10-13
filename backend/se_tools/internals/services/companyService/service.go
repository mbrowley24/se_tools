package companyservice

import (
	"context"
	"se_tools/internals/repository"
	"se_tools/internals/services/userService"
	"se_tools/utils"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Service struct {
	collection   repository.Collection
	utils        utils.Utilities
	loginService userservice.Service
}

func (s *Service) CompanyCollection(db *mongo.Database) *mongo.Collection {
	return db.Collection(s.collection.Companies())
}

func (s *Service) FilterById(id primitive.ObjectID) primitive.M {
	return primitive.M{"_id": id}
}

func (s *Service) FilterBySalesEngineer(id primitive.ObjectID) primitive.M {
	return primitive.M{"sales_engineer": id}
}

func (s *Service) FindById(ctx context.Context, db *mongo.Database, id primitive.ObjectID) (*mongo.SingleResult, error) {
	collection := s.CompanyCollection(db)

	filter := s.FilterById(id)

	return collection.FindOne(ctx, filter), nil
}

func (s *Service) Save(ctx context.Context, db *mongo.Database, data interface{}) (*mongo.InsertOneResult, error) {
	collection := s.CompanyCollection(db)

	return collection.InsertOne(ctx, data)
}
