package authoritiesservice

import (
	"context"
	"path/filepath"
	"se_tools/models/auths"
	"se_tools/repository"
	"se_tools/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Services struct {
	db         repository.DbRepository
	collection repository.Collection
	utils      utils.Utilities
}

// CreateAuthorities creates authorities for inti values
func (s *Services) CreateAuthorities(ctx context.Context) error {

	absPath, err := filepath.Abs("services/authoritiesService/authorities.txt")

	if err != nil {
		println(err.Error())
		return err

	}

	file, err := s.utils.OpenFile(absPath)

	defer func() {
		err := file.Close()
		if err != nil {
			println(err.Error())
		}
	}()

	if err != nil {
		return err
	}

	scanner := s.utils.OpenScanner(file)

	var authSlice []interface{}

	for scanner.Scan() {

		//get auth name from file
		auth := scanner.Text()

		//check if auth name exists and check for error
		exists, err := s.existsByName(ctx, auth)

		if err != nil {
			println(err.Error())
			return err
		}

		//if auth name exists continue
		if exists {
			println("Authority already exists")
			continue
		}

		now := time.Now()
		//create auth model
		authModel := auths.Model{
			Name:      auth,
			CreatedAt: now,
			UpdatedAt: now,
		}

		println(auth)
		//append auth model to slice
		authSlice = append(authSlice, authModel)

	}

	if len(authSlice) > 0 {

		//save auths to db
		_, err = s.saveMany(ctx, authSlice)

		if err != nil {
			println(err.Error())
			return err
		}
	}

	return nil
}

// check if auth name exists
func (s *Services) existsByName(ctx context.Context, name string) (bool, error) {

	collection, err := s.getCollection(ctx)

	if err != nil {
		return false, err
	}

	filter := bson.M{"name": name}

	count, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return false, err
	}

	return count > 0, nil

}

// FindByName finds authority by name
func (s *Services) FindByName(ctx context.Context, name string) (auths.Model, error) {

	var auth auths.Model

	collection, err := s.getCollection(ctx)

	if err != nil {
		return auth, err
	}

	filter := bson.M{"name": name}

	err = collection.FindOne(ctx, filter).Decode(&auth)

	if err != nil {
		return auth, err
	}

	return auth, nil
}

// get collection
func (s *Services) getCollection(ctx context.Context) (*mongo.Collection, error) {

	db, err := s.db.Database(ctx)

	if err != nil {
		return nil, err
	}

	return db.Collection(s.collection.Authorities()), err

}

// save authority
func (s *Services) save(ctx context.Context, data auths.Model) (*mongo.InsertOneResult, error) {

	collection, err := s.getCollection(ctx)

	if err != nil {
		return nil, err
	}

	result, err := collection.InsertOne(ctx, data)

	if err != nil {
		return nil, err
	}

	return result, err
}

// save many authorities
func (s *Services) saveMany(ctx context.Context, data []interface{}) (*mongo.InsertManyResult, error) {

	collection, err := s.getCollection(ctx)

	if err != nil {
		return nil, err
	}

	result, err := collection.InsertMany(ctx, data)

	if err != nil {
		return nil, err
	}

	return result, err
}
