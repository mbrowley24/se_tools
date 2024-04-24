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
	collection repository.Collection
	utils      utils.Utilities
}

// CreateAuthorities creates authorities for inti values
func (s *Services) CreateAuthorities(ctx context.Context, db *mongo.Database) error {

	collection := db.Collection(s.collection.Authorities())

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
		exists, err := s.existsByName(ctx, db, auth)

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
		_, err = collection.InsertMany(ctx, authSlice)

		if err != nil {
			println(err.Error())
			return err
		}
	}

	return nil
}

// check if auth name exists
func (s *Services) existsByName(ctx context.Context, db *mongo.Database, name string) (bool, error) {

	filter := s.FilterByName(name)

	collection := db.Collection(s.collection.Authorities())

	count, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return false, err
	}

	return count > 0, nil

}

// FindByName finds authority by name
func (s *Services) FindByName(ctx context.Context, db *mongo.Database, filter bson.M) (auths.Model, error) {

	var auth auths.Model

	collection := db.Collection(s.collection.Authorities())

	err := collection.FindOne(ctx, filter).Decode(&auth)

	if err != nil {
		return auth, err
	}

	return auth, nil
}

func (s *Services) FilterByName(name string) bson.M {
	return bson.M{"name": name}
}
