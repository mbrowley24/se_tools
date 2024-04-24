package discoveryquestionservices

import (
	"context"
	pagedata "se_tools/models/pageData"
	"se_tools/models/questions"
	"se_tools/repository"
	userservice "se_tools/services/userService"
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
	user       userservice.UserService
	utils      utils.Utilities
}

func (s *Service) CreateQuestion(ctx context.Context,
	db *mongo.Database,
	question string,
	id primitive.ObjectID) (*mongo.InsertOneResult, error) {

	//get colllection
	collection := db.Collection(s.collection.DiscoveryQuestions())

	//generate public id and check for error
	publicId, err := s.generatePublicId(ctx, db)

	if err != nil {

		return nil, err
	}

	//get current time
	now := time.Now()

	//create data to be inserted
	data := bson.M{
		"public_id":  publicId,
		"question":   question,
		"author":     id,
		"created_at": now,
		"updated_at": now,
	}

	//insert data into collection and check for error
	result, err := collection.InsertOne(ctx, data)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s *Service) generatePublicId(ctx context.Context, db *mongo.Database) (string, error) {

	publicId := s.utils.RandomStringGenerator(30)

	collection := db.Collection(s.collection.DiscoveryQuestions())

	count, err := collection.CountDocuments(ctx, bson.M{"public_id": publicId})

	if err != nil {
		return "", err
	}

	for count > 0 {

		publicId = s.utils.RandomStringGenerator(30)

		count, err = collection.CountDocuments(ctx, bson.M{"public_id": publicId})

		if err != nil {
			return "", err
		}
	}

	return publicId, nil

}

func (s *Service) getQuestions(ctx context.Context,
	db *mongo.Database,
	pageData pagedata.DTO) ([]questions.Model, error) {

	//questions model slice
	var questions []questions.Model

	//get collection
	collection := db.Collection(s.collection.DiscoveryQuestions())

	cursor, err := collection.Find(ctx, bson.M{}, &options.FindOptions{
		Skip:  &pageData.Offset,
		Limit: &pageData.Limit,
	})

	if err != nil {
		return nil, err
	}

	//decode cursor and check for error
	err = cursor.All(ctx, &questions)

	if err != nil {
		return nil, err
	}

	return questions, nil
}

func (s *Service) GetQuestions(ctx context.Context,
	db *mongo.Database,
	pageData pagedata.DTO) ([]questions.DTO, error) {

	var dtos []questions.DTO

	questionModels, err := s.getQuestions(ctx, db, pageData)

	if err != nil {
		return nil, err
	}

	for _, question := range questionModels {

		var dto questions.DTO

		dto.PublicId = question.PublicId
		dto.Question = question.Question

		//get user by id
		user, err := s.user.FindUserById(ctx, question.Author)

		if err != nil {
			return nil, err
		}

		firstName := strings.ToUpper(user.FirstName[0:1]) + strings.ToLower(user.FirstName[1:])
		lastName := strings.ToUpper(user.LastName[0:1]) + strings.ToLower(user.LastName[1:])

		dto.Author = firstName + " " + lastName
		dto.Created = question.UpdatedAt

		dtos = append(dtos, dto)
	}

	return dtos, nil
}

func (s *Service) Save(ctx context.Context, db *mongo.Database, question interface{}) (*mongo.InsertOneResult, error) {
	// get questions from database

	collection := db.Collection(s.collection.Questions())

	result, err := collection.InsertOne(ctx, question)

	if err != nil {
		return nil, err
	}

	return result, nil

}
