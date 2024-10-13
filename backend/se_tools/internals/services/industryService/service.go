package industryservice

import (
	"context"
	"path/filepath"
	"se_tools/internals/models/industry"
	"se_tools/internals/repository"
	"se_tools/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Service struct {
	collection repository.Collection
	utils      utils.Utilities
}

func (s *Service) CreateIndustry(ctx context.Context, db *mongo.Database) error {

	absPath, err := filepath.Abs("services/industryService/industry.txt")

	if err != nil {
		println(err.Error())
		return err

	}

	file, err := s.utils.OpenFile(absPath)

	if err != nil {
		return err
	}

	scanner := s.utils.OpenScanner(file)

	var industrySlice []interface{}

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

		// do something with the line
		line := scanner.Text()

		println(line)

		//generate public id
		publicId, err := s.generatePublicId(ctx, db)

		if err != nil {
			return err
		}

		println(line)
		//get current time
		now := time.Now()

		//create industry bson
		industry := bson.M{
			"public_id":  publicId,
			"name":       line,
			"created_at": now,
			"updated_at": now,
		}

		industrySlice = append(industrySlice, industry)

	}

	//check if there are industries to insert by checking the length of the slice
	//if there are no industries to insert return nil
	//if there are industries to insert insert them into the database and check for error
	if len(industrySlice) > 0 {

		collection := db.Collection(s.collection.Industry())

		_, err = collection.InsertMany(ctx, industrySlice)

		if err != nil {

			return err
		}
	}

	return nil
}

func (s *Service) existsByName(ctx context.Context, db *mongo.Database, name string) (bool, error) {

	collection := db.Collection(s.collection.Industry())

	filter := s.filterByName(name)

	count, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func (s *Service) filterByName(name string) bson.M {
	filter := bson.M{"name": name}

	return filter
}

func (s *Service) filterByPublicId(publicId string) bson.M {
	filter := bson.M{"public_id": publicId}

	return filter
}

func (s *Service) FindByPublicId(ctx context.Context, db *mongo.Database, publicId string) (industry.Model, error) {

	filter := s.filterByPublicId(publicId)

	collection := db.Collection(s.collection.Industry())

	var industry industry.Model

	err := collection.FindOne(ctx, filter).Decode(&industry)

	if err != nil {
		return industry, err
	}

	return industry, nil
}

func (s *Service) generatePublicId(ctx context.Context, db *mongo.Database) (string, error) {

	//get collection for industry
	collection := db.Collection(s.collection.Industry())

	//generate public id
	publicId := s.utils.RandomStringGenerator(30)

	//check if public id exists and check for error
	count, err := collection.CountDocuments(ctx, bson.M{"public_id": publicId})

	if err != nil {
		return "", err
	}

	//if public id exists generate another one until unique
	for count > 0 {

		publicId = s.utils.RandomStringGenerator(30)

		count, err = collection.CountDocuments(ctx, bson.M{"public_id": publicId})

		if err != nil {
			return "", err
		}
	}

	return publicId, nil

}

func (s *Service) GetIndustries(ctx context.Context, db *mongo.Database) ([]bson.M, error) {

	collection := db.Collection(s.collection.Industry())

	opt := options.Find().SetSort(bson.D{{Key: "name", Value: 1}})

	cursor, err := collection.Find(ctx, bson.M{}, opt)

	if err != nil {
		return nil, err
	}

	var results []bson.M

	if err = cursor.All(ctx, &results); err != nil {
		return nil, err
	}

	var industries []bson.M

	for _, result := range results {

		option := bson.M{"value": result["public_id"], "name": result["name"]}

		industries = append(industries, option)
	}

	return industries, nil
}

func (s *Service) GetIndustryIds(ctx context.Context, db *mongo.Database, ids []string) ([]primitive.ObjectID, error) {

	collection := db.Collection(s.collection.Industry())

	var industryIds []primitive.ObjectID

	for _, id := range ids {

		filter := s.filterByPublicId(id)

		var industry industry.Model

		err := collection.FindOne(ctx, filter).Decode(&industry)

		if err != nil {
			return nil, err
		}

		industryIds = append(industryIds, industry.ID)
	}

	return industryIds, nil
}
