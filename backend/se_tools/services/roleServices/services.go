package roleservices

import (
	"context"
	"path/filepath"
	"se_tools/models/auths"
	"se_tools/models/roles"
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

// CreateRoles creates roles for inti values
func (s *Services) CreateRoles(ctx context.Context, db *mongo.Database) error {
	absPath, err := filepath.Abs("services/roleServices/roles.txt")

	if err != nil {
		println(err.Error())
		return err

	}

	file, err := s.utils.OpenFile(absPath)
	defer func() error {
		err := file.Close()

		if err != nil {
			return err
		}

		return nil
	}()

	if err != nil {
		return err
	}

	scanner := s.utils.OpenScanner(file)

	var roleSlice []interface{}

	for scanner.Scan() {
		//check if role exists and check for error
		exists, err := s.existsByName(ctx, db, scanner.Text())

		if err != nil {
			return err
		}

		//if role exists continue to next iteration
		if exists {

			continue
		}

		var role roles.Role
		// do something with the line
		line := scanner.Text()
		role.Name = line
		role.Authorities = []auths.Model{}

		now := time.Now()
		role.CreatedAt = now
		role.UpdatedAt = now

		roleSlice = append(roleSlice, role)
		println(line)
	}

	if len(roleSlice) > 0 {

		collection := db.Collection(s.collection.Roles())

		_, err = collection.InsertMany(ctx, roleSlice)

		if err != nil {

			return err
		}
	}

	return nil

}

// check if role exists by name
func (s *Services) existsByName(ctx context.Context, db *mongo.Database, name string) (bool, error) {

	filter := bson.M{"name": name}

	collection := db.Collection(s.collection.Roles())

	count, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func (s *Services) FindByName(ctx context.Context, db *mongo.Database, filter bson.M) (roles.Role, error) {

	var role roles.Role

	collection := db.Collection(s.collection.Roles())

	err := collection.FindOne(ctx, filter).Decode(&role)

	if err != nil {
		return role, err
	}

	return role, nil
}

func (s *Services) FindByNameFilter(name string) bson.M {

	return bson.M{"name": name}
}
