package productService

import (
	"bufio"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"os"
	"se_tools/internals/models/products"
	"se_tools/utils"
	"strings"
	"time"
)

type Service struct {
	collection *mongo.Collection
	Utils      *utils.Utilities
}

func Start(collection *mongo.Collection, utils *utils.Utilities) *Service {

	return &Service{
		collection: collection,
		Utils:      utils,
	}
}

func (s *Service) Initialize() error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	file, err := os.Open("./configFiles/products.txt")

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

		product := scanner.Text()

		text := strings.Split(product, "/")

		//count documents with name. If document count is greater than zero document exists
		//continue to next iteration. This is a guard against duplicate entries
		filter := bson.M{"name": text[0]}

		count, err := s.collection.CountDocuments(ctx, filter)

		if err != nil {
			return err
		}

		if count > 0 {
			continue
		}

		//Generate unique public ID. This ID is completely random and intended to be used by frontend
		//Random number generator is seeded by the time. Count documents until pubIdCount is zero and
		//publicId is unique in the collection
		publicId := s.Utils.RandomStringGenerator(30)

		for {

			publicIdFilter := bson.M{"public_id": publicId}

			pubIdCount, err := s.collection.CountDocuments(ctx, publicIdFilter)

			if err != nil {
				return err
			}

			if pubIdCount == 0 {
				break
			}

			publicId = s.Utils.RandomStringGenerator(30)
		}

		now := time.Now()

		productModel := products.Model{
			PublicId:    publicId,
			Name:        strings.TrimSpace(text[0]),
			Description: strings.TrimSpace(text[1]),
			CreatedAt:   now,
			UpdatedAt:   now,
		}

		if _, err := s.collection.InsertOne(ctx, productModel); err != nil {
			return err
		}

	}

	return nil

}
