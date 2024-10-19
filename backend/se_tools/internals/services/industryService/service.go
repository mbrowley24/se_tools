package industryservice

import (
	"bufio"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
	"se_tools/internals/models/industry"
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

	file, err := os.Open("./configFiles/industry.txt")

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

		industryName := scanner.Text()

		//count documents with name. If document count is greater than zero document exists
		//continue to next iteration. This is a guard against duplicate entries
		filter := bson.M{"name": industryName}
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
		publicId := s.utils.RandomStringGenerator(30)

		for {

			publicIdFilter := bson.M{"publicId": publicId}

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

		industryModel := industry.Model{
			Name:      industryName,
			PublicId:  publicId,
			CreatedAt: now,
			UpdatedAt: now,
		}

		if _, err := s.collection.InsertOne(ctx, industryModel); err != nil {
			return err
		}

	}

	return nil

}

func (s *Service) FilterPublicId(publicId string) bson.M {

	return bson.M{"public_id": publicId}
}

func (s *Service) FindIndustries(ctx context.Context, filter bson.M, opts *options.FindOptions) (*mongo.Cursor, error) {

	results, err := s.collection.Find(ctx, filter, opts)

	if err != nil {
		return nil, err
	}

	return results, err
}

func (s *Service) FindIndustry(ctx context.Context, filter bson.M, opts *options.FindOneOptions) *mongo.SingleResult {

	results := s.collection.FindOne(ctx, filter, opts)

	return results
}

func (s *Service) GeneratePublicId(ctx context.Context) (string, error) {

	publicId := s.utils.RandomStringGenerator(30)

	for {
		filter := s.FilterPublicId(publicId)

		count, err := s.collection.CountDocuments(ctx, filter)

		if err != nil {
			return "", err
		}

		if count == 0 {
			break
		}

		publicId = s.utils.RandomStringGenerator(30)
	}

	return publicId, nil
}
