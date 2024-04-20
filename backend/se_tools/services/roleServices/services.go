package roleservices

import (
	"context"
	"path/filepath"
	"se_tools/models/roles"
	"se_tools/repository"
	"se_tools/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Services struct {
	db         repository.DbRepository
	collection repository.Collection
	utils      utils.Utilities
}

// CreateRoles creates roles for inti values
func (s *Services) CreateRoles(ctx context.Context) error {
	absPath, err := filepath.Abs("services/roleServices/roles.txt")

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

	var roleSlice []interface{}

	for scanner.Scan() {
		//check if role exists and check for error
		exists, err := s.existsByName(ctx, scanner.Text())

		if err != nil {
			return err
		}

		//if role exists continue to next iteration
		if exists {
			println("Role already exists")
			continue
		}

		var role roles.Role
		// do something with the line
		line := scanner.Text()
		role.Name = line
		role.Authorities = []primitive.ObjectID{}

		now := time.Now()
		role.CreatedAt = now
		role.UpdatedAt = now

		roleSlice = append(roleSlice, role)
		println(line)
	}

	if len(roleSlice) > 0 {

		_, err = s.saveMany(ctx, roleSlice)

		if err != nil {

			return err
		}
	}

	return nil

}

// check if role exists by name
func (s *Services) existsByName(ctx context.Context, name string) (bool, error) {

	exists := false
	collection, err := s.getCollection(ctx)

	if err != nil {
		println(err.Error())
		return false, err
	}

	filter := map[string]string{"name": name}

	count, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return false, err
	}

	if count > 0 {
		exists = true
	}

	return exists, nil
}

// FindByName finds role by name
func (s *Services) FindByName(ctx context.Context, name string) (roles.Role, error) {

	var role roles.Role

	collection, err := s.getCollection(ctx)

	if err != nil {
		println(err.Error())
		return role, err
	}

	filter := bson.M{"name": name}

	err = collection.FindOne(ctx, filter).Decode(&role)

	if err != nil {
		println(err.Error())
		return role, err
	}

	return role, nil
}

// get roles collection
func (s *Services) getCollection(ctx context.Context) (*mongo.Collection, error) {

	db, err := s.db.Database(ctx)

	if err != nil {
		println(err.Error())
		return nil, err
	}

	return db.Collection(s.collection.Roles()), nil
}

// Update role
func (s *Services) Update(ctx context.Context, filter, update bson.M) (*mongo.UpdateResult, error) {

	collection, err := s.getCollection(ctx)

	if err != nil {
		println(err.Error())
		return nil, err
	}

	result, err := collection.UpdateOne(ctx, filter, update)

	if err != nil {
		println(err.Error())
		return nil, err
	}

	return result, nil
}

// save role to db
func (s *Services) save(ctx context.Context, role roles.Role) (*mongo.InsertOneResult, error) {

	collection, err := s.getCollection(ctx)

	if err != nil {
		println(err.Error())
		return nil, err
	}

	result, err := collection.InsertOne(ctx, role)

	if err != nil {
		println(err.Error())
		return nil, err
	}

	return result, nil
}

// save many roles to db
func (s *Services) saveMany(ctx context.Context, roles []interface{}) (*mongo.InsertManyResult, error) {

	collection, err := s.getCollection(ctx)

	if err != nil {
		println(err.Error())
		return nil, err
	}

	result, err := collection.InsertMany(ctx, roles)

	if err != nil {
		println(err.Error())
		return nil, err
	}

	return result, nil
}
