package salesroleservice

import (
	"bufio"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"os"
	"se_tools/internals/models/salesroles"
	"se_tools/utils"
	"time"
)

type Service struct {
	collection *mongo.Collection
	utils      *utils.Utilities
}

func Start(collection *mongo.Collection, utils *utils.Utilities) *Service {

	return &Service{
		collection: collection,
		utils:      utils,
	}
}

func (s *Service) Initialize() error {

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	file, err := os.Open("./configFiles/salesRoles.txt")

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

		if err := scanner.Err(); err != nil {
			return err
		}

		roleName := scanner.Text()

		filter := bson.M{"name": roleName}

		count, err := s.collection.CountDocuments(ctx, filter)

		if err != nil {
			return err
		}

		if count > 0 {
			continue
		}

		publicId := s.utils.RandomStringGenerator(30)

		for {

			pubFilter := bson.M{"public_id": publicId}

			pubCount, err := s.collection.CountDocuments(ctx, pubFilter)

			if err != nil {
				return err
			}

			if pubCount == 0 {
				break
			}

			publicId = s.utils.RandomStringGenerator(30)
		}

		now := time.Now()
		salesRole := salesroles.Model{
			Name:      roleName,
			PublicId:  publicId,
			CreatedAt: now,
			UpdatedAt: now,
		}

		if _, err := s.collection.InsertOne(ctx, salesRole); err != nil {
			return err
		}
	}

	return nil
}
