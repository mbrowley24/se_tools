package salesrepservice

import (
	"context"
	"fmt"
	"se_tools/models/appUser"
	optionsdto "se_tools/models/optionsDto"
	"se_tools/models/salesrep"
	"se_tools/models/salesroles"
	"se_tools/repository"
	"se_tools/services/salesroleservice"
	userservice "se_tools/services/userService"
	"se_tools/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Service struct {
	Collection       repository.Collection
	salesRoleService salesroleservice.Service
	userservice      userservice.UserService
	Utils            utils.Utilities
}

// get collection name from repository
func (s *Service) SalesRepCollection(db *mongo.Database) *mongo.Collection {
	return db.Collection(s.Collection.SalesReps())
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

func (s *Service) ModelToDTO(ctx context.Context, salesRep salesrep.Model) (salesrep.DTO, error) {

	//salesEngineer Name with capitalized first and last name
	salesEngineer := fmt.Sprintf("%s %s", s.Utils.Capitalize(salesRep.SalesEngineer.FirstName), s.Utils.Capitalize(salesRep.SalesEngineer.LastName))

	//role name
	roleId := s.Utils.Capitalize(salesRep.Role.PublicId)

	return salesrep.DTO{
		ID:            salesRep.PublicId,
		FirstName:     s.Utils.Capitalize(salesRep.FirstName),
		LastName:      s.Utils.Capitalize(salesRep.LastName),
		Email:         salesRep.Email,
		Phone:         salesRep.Phone,
		Role:          roleId,
		SalesEngineer: salesEngineer,
		Quota:         salesRep.Quota,
	}, nil
}

// Models to DTO
func (s *Service) ModelsToDTOs(ctx context.Context, salesReps []salesrep.Model) ([]salesrep.DTO, error) {

	var salesRepsDTO []salesrep.DTO

	for _, salesRep := range salesReps {

		dto, err := s.ModelToDTO(ctx, salesRep)

		if err != nil {
			return nil, err
		}

		salesRepsDTO = append(salesRepsDTO, dto)
	}

	return salesRepsDTO, nil
}

func (s *Service) NewSalesRep(ctx context.Context,
	collection *mongo.Collection,
	newRep salesrep.NewSalesRep,
	eng appUser.User,
	role salesroles.Model) (bson.D, error) {

	publicId, err := s.GeneratePublicID(ctx, collection)

	if err != nil {
		return nil, err
	}

	now := time.Now()

	return bson.D{
		{Key: "public_id", Value: publicId},
		{Key: "first_name", Value: newRep.FirstName},
		{Key: "last_name", Value: newRep.LastName},
		{Key: "email", Value: newRep.Email},
		{Key: "phone", Value: newRep.Phone},
		{Key: "sales_engineer", Value: eng.Embed()},
		{Key: "role", Value: role.Embed()},
		{Key: "quota", Value: newRep.Quota},
		{Key: "created_at", Value: now},
		{Key: "updated_at", Value: now},
	}, nil
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
