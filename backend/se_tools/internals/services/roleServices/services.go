package roleservices

import (
	"bufio"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"os"
	"se_tools/internals/models/auths"
	"se_tools/internals/models/roles"
	"se_tools/utils"
	"time"
)

type Services struct {
	collection *mongo.Collection
	utils      *utils.Utilities
}

func Start(collection *mongo.Collection, utils *utils.Utilities) *Services {

	return &Services{collection, utils}
}

func (s *Services) AdminRoleAssignments(auths []auths.Model) error {

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"name": "admin"}

	update := bson.M{
		"$set": bson.M{
			"authorities": auths,
		},
	}

	if _, err := s.collection.UpdateOne(ctx, filter, update); err != nil {
		return err
	}

	return nil
}

func (s *Services) GetRoleByName(name string) (roles.Role, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var role roles.Role
	filter := bson.M{"name": name}

	if err := s.collection.FindOne(ctx, filter).Decode(&role); err != nil {

		return role, err
	}
	return role, nil
}

func (s *Services) Initialize() error {

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	file, err := os.Open("./configFiles/roles.txt")

	defer func(file *os.File) {

		if err := file.Close(); err != nil {
			log.Fatal(err)
		}

	}(file)

	if err != nil {

		println(err.Error())
		return err
	}

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {

		roleName := scanner.Text()

		filter := bson.M{"name": roleName}

		//Count the documents with the role. If document exist count will be equal to one
		count, err := s.collection.CountDocuments(ctx, filter)

		if err != nil {
			return err
		}

		//Skip crating role if exists
		if count > 0 {
			continue
		}

		publicId := s.utils.RandomStringGenerator(30)

		for {

			pubFilter := bson.M{"public_id": publicId}

			pubIdCount, err := s.collection.CountDocuments(ctx, pubFilter)

			if err != nil {
				return err
			}

			if pubIdCount == 0 {
				break
			}

			publicId = s.utils.RandomStringGenerator(30)

		}

		now := time.Now()
		role := roles.Role{
			Name:        roleName,
			PublicId:    publicId,
			Authorities: []auths.Model{},
			CreatedAt:   now,
			UpdatedAt:   now,
		}

		if _, err = s.collection.InsertOne(ctx, role); err != nil {

			return err
		}
	}

	return nil
}
