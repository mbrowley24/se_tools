package salesroleservice

import (
	"bufio"
	"context"
	"os"
	"path/filepath"
	optionsdto "se_tools/models/optionsDto"
	"se_tools/models/salesroles"
	"se_tools/repository"
	"se_tools/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Service struct {
	Collection repository.Collection
	Utils      utils.Utilities
}

func (s *Service) SalesRoleCollection(db *mongo.Database) *mongo.Collection {

	return db.Collection(s.Collection.SalesRoles())
}

// GeneratePublicID generates a public id for a sales role
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

// FilterBypublicId returns a bson.M filter for sales reps by public id
func (s *Service) FilterByPublicId(publicId string) bson.M {
	return bson.M{"public_id": publicId}
}

func (s *Service) FilterById(id primitive.ObjectID) bson.M {

	return bson.M{"_id": id}
}

// FilterByRoleName returns a bson.M filter for sales reps by role name
func (s *Service) FilterByRoleName(name string) bson.M {

	return bson.M{"name": name}
}

func (s *Service) Init(ctx context.Context, db *mongo.Database) error {

	collection := s.SalesRoleCollection(db)

	absPath, err := filepath.Abs("services/salesroleservice/salesRolls.txt")

	if err != nil {
		return err
	}

	file, err := os.Open(absPath)

	if err != nil {
		return err
	}

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {

		//role name
		role := scanner.Text()

		//filter by role name
		roleFilter := s.FilterByRoleName(role)

		//check if role exists and check for error
		count, err := collection.CountDocuments(ctx, roleFilter)

		if err != nil {
			return err
		}

		//if role exists continue to next iteration
		if count > 0 {
			continue
		}

		publicId, err := s.GeneratePublicID(ctx, collection)

		if err != nil {
			return err
		}

		//create role
		roleData := s.NewRole(role, publicId)

		_, err = collection.InsertOne(ctx, roleData)

		if err != nil {
			return err
		}
	}

	return nil
}

func (s *Service) ModelsToOptions(roles []salesroles.Model) []optionsdto.Option {

	var options []optionsdto.Option

	for _, role := range roles {
		options = append(options, role.ModelToOption())
	}

	return options
}

// new role service
func (s *Service) NewRole(name, publicId string) bson.M {

	now := time.Now()

	return bson.M{
		"public_id":   publicId,
		"name":        name,
		"description": "",
		"created_at":  now,
		"updated_at":  now,
	}
}

func (s *Service) ResultToModel(result *mongo.SingleResult) (salesroles.Model, error) {

	var role salesroles.Model

	err := result.Decode(&role)

	if err != nil {
		return role, err
	}

	return role, nil
}

func (s *Service) ResultsToModels(ctx context.Context, results *mongo.Cursor) ([]salesroles.Model, error) {

	var roles []salesroles.Model

	for results.Next(ctx) {

		var role salesroles.Model

		err := results.Decode(&role)

		if err != nil {
			return roles, err
		}

		roles = append(roles, role)
	}

	return roles, nil
}
