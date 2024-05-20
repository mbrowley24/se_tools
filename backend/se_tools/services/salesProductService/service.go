package salesproductservice

import (
	"bufio"
	"context"
	"os"
	"path/filepath"
	"se_tools/repository"
	"se_tools/utils"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Service struct {
	Collection repository.Collection
	Utils      utils.Utilities
}

// SalesProductService is the interface for the sales product service
func (s *Service) SalesProductCollection(db *mongo.Database) *mongo.Collection {

	return db.Collection(s.Collection.SalesProducts())
}

func (s *Service) CreateProducts(ctx context.Context, db *mongo.Database) error {

	collection := s.SalesProductCollection(db)

	absPath, err := filepath.Abs("services/salesProductService/products.txt")

	if err != nil {
		return err
	}

	file, err := os.Open(absPath)

	if err != nil {
		return err
	}

	var productDataSlice []interface{}

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {

		product := scanner.Text()

		productSlice := strings.Split(product, "/")

		filterName := s.FilterByName(productSlice[0])

		count, err := collection.CountDocuments(ctx, filterName)

		if err != nil {
			return err
		}

		//if count is greater than 0, then the product already exists
		if count > 0 {
			continue
		}

		publicId, err := s.GeneratePublicID(ctx, db)

		if err != nil {
			return err
		}

		now := time.Now()

		data := bson.D{{Key: "public_id", Value: publicId},
			{Key: "name", Value: productSlice[0]},
			{Key: "description", Value: productSlice[1]},
			{Key: "created_at", Value: now},
			{Key: "updated_at", Value: now},
		}

		productDataSlice = append(productDataSlice, data)

	}

	if len(productDataSlice) > 0 {
		_, err = collection.InsertMany(ctx, productDataSlice)

		if err != nil {
			return err
		}
	}

	return nil
}

func (s *Service) FilterByName(name string) bson.M {
	return bson.M{"name": name}
}

func (s *Service) FilterByPublicID(publicId string) bson.M {
	return bson.M{"public_id": publicId}
}

func (s *Service) GeneratePublicID(ctx context.Context, db *mongo.Database) (string, error) {

	for {
		publicId := s.Utils.RandomStringGenerator(30)

		filter := s.FilterByPublicID(publicId)

		count, err := s.SalesProductCollection(db).CountDocuments(ctx, filter)

		if err != nil {
			return "", err
		}

		if count > 0 {
			continue
		}

		if count == 0 {
			return publicId, nil
		}
	}

}
