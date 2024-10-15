package authoritiesservice

import (
	"bufio"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"os"
	"se_tools/internals/models/auths"
	"se_tools/utils"
	"time"
)

type Services struct {
	collection *mongo.Collection
	utils      *utils.Utilities
}

func Start(collection *mongo.Collection, utils *utils.Utilities) *Services {

	return &Services{
		collection: collection,
		utils:      utils,
	}
}

func (s *Services) AdminAuths() ([]auths.Model, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var authModels []auths.Model
	authString := []string{"read_admin", "write_admin", "delete_admin"}

	for _, auth := range authString {

		var model auths.Model
		filter := bson.M{"name": auth}

		if err := s.collection.FindOne(ctx, filter).Decode(&model); err != nil {

			return nil, err
		}

		authModels = append(authModels, model)

	}

	return authModels, nil
}

func (s *Services) Initialize() error {

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	file, err := os.Open("./configFiles/authorities.txt")

	defer func(file *os.File) {

		if err := file.Close(); err != nil {
			log.Fatal(err)
		}

	}(file)

	if err != nil {
		return err
	}

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {

		authName := scanner.Text()

		filter := bson.M{"name": authName}

		//check if name exists in a document. count equals zero the name is unique and can be saved
		count, err := s.collection.CountDocuments(ctx, filter)

		if err != nil {
			return err
		}

		if count > 0 {
			continue
		}

		publicId := s.utils.RandomStringGenerator(30)

		for {

			publicIdFilter := bson.M{"public_id": publicId}

			pubIdCount, err := s.collection.CountDocuments(ctx, publicIdFilter)

			if err != nil {
				return err
			}

			if pubIdCount == 0 {
				break
			}

			publicId = s.utils.RandomStringGenerator(30)
		}

		now := time.Now()

		auth := auths.Model{
			Name:      authName,
			PublicId:  publicId,
			CreatedAt: now,
			UpdatedAt: now,
		}

		if _, err := s.collection.InsertOne(ctx, auth); err != nil {
			return err
		}
	}

	return nil

}
