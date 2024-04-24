package categoryservice

import (
	"context"
	"path/filepath"
	"se_tools/models/category"
	"se_tools/repository"
	"se_tools/utils"
	"strings"
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

func (s *Service) CreateCategory(ctx context.Context, db *mongo.Database) error {
	absPath, err := filepath.Abs("services/categoryService/categories.txt")

	if err != nil {
		println(err.Error())
		return err

	}

	file, err := s.utils.OpenFile(absPath)

	if err != nil {
		return err
	}

	scanner := s.utils.OpenScanner(file)

	var categorySlice []interface{}

	for scanner.Scan() {

		// do something with the line
		line := scanner.Text()

		println(line)

		text := strings.Split(line, ":")

		//check if role exists and check for error
		exists, err := s.existsByName(ctx, db, text[0])

		if err != nil {
			return err
		}

		//if role exists continue to next iteration
		if exists {
			println("category already exists")
			continue
		}

		//generate public id
		publicId, err := s.generatePublicId(ctx, db)

		if err != nil {
			return err
		}

		println(line)
		//get current time
		now := time.Now()

		//create industry bson
		category := bson.D{
			{Key: "public_id", Value: publicId},
			{Key: "name", Value: text[0]},
			{Key: "description", Value: text[1]},
			{Key: "created_at", Value: now},
			{Key: "updated_at", Value: now},
		}

		categorySlice = append(categorySlice, category)

	}

	//check if there are categories to insert by checking the length of the slice
	//if there are no categories to insert return nil
	//if there are categories to insert insert them into the database and check for error
	if len(categorySlice) > 0 {

		collection := db.Collection(s.collection.Categories())

		_, err = collection.InsertMany(ctx, categorySlice)

		if err != nil {

			return err
		}
	}

	return nil
}

func (s *Service) existsByName(ctx context.Context, db *mongo.Database, name string) (bool, error) {

	filter := bson.M{"name": name}

	collection := db.Collection(s.collection.Categories())

	count, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func (s *Service) FilterByName(name string) bson.M {

	return bson.M{"name": name}
}

func (s *Service) filterByPublicId(publicId string) bson.M {

	return bson.M{"public_id": publicId}
}

func (s *Service) FindByPublicId(ctx context.Context, db *mongo.Database, publicId string) (category.Model, error) {

	filter := s.filterByPublicId(publicId)

	collection := db.Collection(s.collection.Categories())

	var result category.Model

	err := collection.FindOne(ctx, filter).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

// generate public id
func (s *Service) generatePublicId(ctx context.Context, db *mongo.Database) (string, error) {

	publicId := s.utils.RandomStringGenerator(30)

	filter := s.filterByPublicId(publicId)

	collection := db.Collection(s.collection.Categories())

	count, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return "", err
	}

	for count > 0 {

		publicId = s.utils.RandomStringGenerator(30)

		filter = s.filterByPublicId(publicId)

		count, err = collection.CountDocuments(ctx, filter)

		if err != nil {
			return "", err
		}
	}

	return publicId, nil
}

func (s *Service) GetCategories(ctx context.Context, db *mongo.Database) ([]bson.M, error) {

	collection := db.Collection(s.collection.Categories())

	opts := options.Find().SetSort(bson.D{{Key: "name", Value: 1}})

	cursor, err := collection.Find(ctx, bson.M{}, opts)

	if err != nil {
		return nil, err
	}

	var results []bson.M

	err = cursor.All(ctx, &results)

	if err != nil {
		return nil, err
	}

	var categories []bson.M

	for _, result := range results {

		category := bson.M{
			"value": result["public_id"],
			"name":  result["name"],
		}

		categories = append(categories, category)
	}

	return categories, nil
}

func (s *Service) GetCategoryIds(ctx context.Context, db *mongo.Database, categories []string) ([]primitive.ObjectID, error) {

	collection := db.Collection(s.collection.Categories())

	var categoryIds []primitive.ObjectID

	for _, publicId := range categories {

		var model category.Model

		filter := s.filterByPublicId(publicId)

		err := collection.FindOne(ctx, filter).Decode(&model)

		if err != nil {
			return nil, err
		}

		categoryIds = append(categoryIds, model.ID)
	}

	return categoryIds, nil
}
