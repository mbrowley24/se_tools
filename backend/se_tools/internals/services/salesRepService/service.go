package salesrepservice

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"se_tools/internals/models/optionsDto"
	"se_tools/internals/models/salesrep"
	"se_tools/internals/services/salesroleservice"
)

type Service struct {
	Collection       *mongo.Collection
	salesRoleService salesroleservice.Service
}

func (s *Service) GeneratePublicID(ctx context.Context, collection *mongo.Collection) (string, error) {

	publicId := s.Utils.RandomStringGenerator(30)

	for {

		filter := s.FilterByPublicId(publicId)

		count, err := collection.CountDocuments(ctx, filter)

		if err != nil {
			return "", err
		}

		if count == 0 {
			break
		}

		publicId = s.Utils.RandomStringGenerator(30)

	}

	return publicId, nil

}

func (s *Service) FilterById(id primitive.ObjectID) bson.M {
	return bson.M{"_id": id}
}

// filter by name
func (s *Service) FilterByName(name string) bson.M {
	return bson.M{"name": name}
}

// FilterBYpublicID returns a bson.M filter for sales reps by public id
func (s *Service) FilterByPublicId(publicId string) bson.M {
	return bson.M{"public_id": publicId}
}

// FilterBySalesEngineer returns a bson.M filter for sales reps by sales engineer
func (s *Service) FilterBySalesEngineer(enginerrId primitive.ObjectID) bson.M {
	return bson.M{"sales_engineer._id": enginerrId}
}

func (s *Service) FindByPublicId(ctx context.Context, db *mongo.Database, publicId string) (salesrep.Model, error) {

	var salesRep salesrep.Model

	collection := s.SalesRepCollection(db)

	filter := s.FilterByPublicId(publicId)

	result := collection.FindOne(ctx, filter)

	err := result.Decode(&salesRep)

	if err != nil {
		return salesrep.Model{}, err
	}

	return salesRep, nil
}

// Converts a mongo cursor to a slice of salesrep models
func (s *Service) CrusorToModel(ctx context.Context, cursor *mongo.Cursor) ([]salesrep.Model, error) {

	var salesReps []salesrep.Model

	for cursor.Next(ctx) {

		var salesRep salesrep.Model

		err := cursor.Decode(&salesRep)

		if err != nil {
			return nil, err
		}

		salesReps = append(salesReps, salesRep)
	}

	return salesReps, nil
}

func (s *Service) DeleteSalesRep(ctx context.Context, db *mongo.Database, publicId string) (*mongo.DeleteResult, error) {

	collection := s.SalesRepCollection(db)

	filter := s.FilterByPublicId(publicId)

	deleteResult, err := collection.DeleteOne(ctx, filter)

	if err != nil {
		return nil, err
	}

	return deleteResult, nil
}

func (s *Service) FindById(ctx context.Context, db *mongo.Database, id primitive.ObjectID) (salesrep.Model, error) {

	var salesRep salesrep.Model

	collection := s.SalesRepCollection(db)

	filter := s.FilterById(id)

	result := collection.FindOne(ctx, filter)

	err := result.Decode(&salesRep)

	if err != nil {
		return salesrep.Model{}, err
	}

	return salesRep, nil
}

// single result to model
func (s *Service) ResultToModel(result *mongo.SingleResult) (salesrep.Model, error) {

	var salesRep salesrep.Model

	err := result.Decode(&salesRep)

	if err != nil {
		return salesrep.Model{}, err
	}

	return salesRep, nil
}

// get sales rep name name
func (s *Service) SalesRepName(model salesrep.Model) optionsdto.Option {

	var option optionsdto.Option

	option.Value = model.PublicId
	option.Name = fmt.Sprintf("%s %s", s.Utils.Capitalize(model.FirstName), s.Utils.Capitalize(model.LastName))

	return option
}
