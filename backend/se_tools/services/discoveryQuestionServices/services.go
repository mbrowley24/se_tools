package discoveryquestionservices

import (
	"context"
	discoveryquestionlikes "se_tools/models/discovery_question_likes"
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

func (s *Service) DiscoveryQuestionCollection() string {
	return s.collection.DiscoveryQuestions()
}

func (s *Service) DiscoveryQuestionLikesCollection() string {
	return s.collection.DiscoveryQuestionLikes()
}

func (s *Service) CreateQuestion(ctx context.Context,
	collection *mongo.Collection,
	question string,
	id primitive.ObjectID) (*mongo.InsertOneResult, error) {

	//generate public id and check for error
	publicId, err := s.generatePublicId(ctx, collection)

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

// Crusor to model converts a mongo cursor to a slice of models and checks for error
func (s *Service) CursorToModel(ctx context.Context, results *mongo.Cursor) ([]questions.Model, error) {

	var questions []questions.Model

	err := results.All(ctx, &questions)

	if err != nil {
		return nil, err
	}

	return questions, nil
}

func (s *Service) FilterById(id primitive.ObjectID) bson.M {
	return bson.M{"_id": id}
}

func (s *Service) FilterByPublicId(publicId string) bson.M {
	return bson.M{"public_id": publicId}
}

func (s *Service) FilterLike(liked bool) bson.M {
	return bson.M{"liked": liked}
}

func (s *Service) FilterMyLike(userId, questionId primitive.ObjectID) bson.M {
	return bson.M{"user_id": userId, "question_id": questionId}
}

// FindAll returns all questions with pagination
func (s *Service) FindAll(ctx context.Context, db *mongo.Database, pageInfo pagedata.DTO) (*mongo.Cursor, error) {

	collection := db.Collection(s.DiscoveryQuestionCollection())

	//find options
	opts := options.Find().SetLimit(pageInfo.Limit).SetSkip(pageInfo.Offset)

	cursor, err := collection.Find(ctx, bson.M{}, opts)

	if err != nil {
		return nil, err
	}

	return cursor, nil
}

// FindById returns a single question by id
func (s *Service) FindById(ctx context.Context, db *mongo.Database, id primitive.ObjectID) (*mongo.SingleResult, error) {

	collection := db.Collection(s.DiscoveryQuestionCollection())

	filter := s.FilterById(id)

	result := collection.FindOne(ctx, filter)

	if result.Err() != nil {
		return nil, result.Err()
	}

	return result, nil
}

// FindByPublicId returns a single question by public id
func (s *Service) FindByPublicId(ctx context.Context, db *mongo.Database, publicId string) (*mongo.SingleResult, error) {

	collection := db.Collection(s.DiscoveryQuestionCollection())

	filter := s.FilterByPublicId(publicId)

	result := collection.FindOne(ctx, filter)

	if result.Err() != nil {
		return nil, result.Err()
	}

	return result, nil
}

// FindByPublicId returns a single question decoding a mongo single result to a model
func (s *Service) GetDiscoveryQuestionModel(result *mongo.SingleResult) (questions.Model, error) {
	var question questions.Model

	err := result.Decode(&question)

	if err != nil {
		return question, err
	}

	return question, nil
}

// GetModelTODto converts a question model to a question dto and checks for error
func (s *Service) GetModelTODto(ctx context.Context, question questions.Model, db *mongo.Database) (questions.DTO, error) {

	var dto questions.DTO

	likeQuestionCollection := db.Collection(s.DiscoveryQuestionLikesCollection())

	dto.ID = question.PublicId
	dto.Question = question.Question

	user, err := s.user.FindUserById(ctx, db, question.Author)

	if err != nil {
		return dto, err
	}

	dto.Author = s.user.GetAuthorName(user)
	dto.Updated = question.UpdatedAt

	//get my vote filter
	myVoteFilter := s.FilterMyLike(user.ID, question.ID)

	//query like by user and question and check for error
	likeResult, err := s.FindMyLike(ctx, likeQuestionCollection, myVoteFilter)

	//check for error excluding not found error
	if err != nil && err.Error() != mongo.ErrNoDocuments.Error() {
		return dto, err
	}

	//like and dislike filters
	//if like not found my vote is false indicating user has not voted
	//if like found get like and set my vote to like.Liked true or false
	if err != nil && err.Error() == mongo.ErrNoDocuments.Error() {

		dto.MyVote = false
		dto.Voted = false

	} else {

		like, err := s.MyLikeModel(likeResult)

		if err != nil {
			return dto, err
		}

		dto.Voted = true
		dto.MyVote = like.Liked
	}

	//like and dislike filters
	dislike := s.FilterLike(false)
	like := s.FilterLike(true)

	//get count of likes and dislikes and check for error
	dislikeCount, err := likeQuestionCollection.CountDocuments(ctx, dislike)

	if err != nil {
		return dto, err
	}

	likeCount, err := likeQuestionCollection.CountDocuments(ctx, like)

	if err != nil {
		return dto, err
	}

	dto.VoteUP = likeCount
	dto.VoteDown = dislikeCount

	return dto, nil
}

func (s *Service) generatePublicId(ctx context.Context, collection *mongo.Collection) (string, error) {

	publicId := s.utils.RandomStringGenerator(30)

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
	collection *mongo.Collection,
	pageData pagedata.DTO) ([]questions.Model, error) {

	//questions model slice
	var questionModels []questions.Model

	println("pageData", pageData.Offset, pageData.Limit)

	cursor, err := collection.Find(ctx, bson.M{}, &options.FindOptions{
		Skip:  &pageData.Offset,
		Limit: &pageData.Limit,
	})

	if err != nil {
		return nil, err
	}

	for cursor.Next(ctx) {
		var question questions.Model

		err := cursor.Decode(&question)

		if err != nil {
			return nil, err
		}

		println("question", question.Question)
	}

	//decode cursor and check for error
	err = cursor.All(ctx, &questionModels)

	if err != nil {
		return nil, err
	}

	return questionModels, nil
}

func (s *Service) GetQuestions(ctx context.Context,
	db *mongo.Database,
	pageData pagedata.DTO) ([]questions.DTO, error) {

	var dtos []questions.DTO

	//get question collection
	questionsCollection := db.Collection(s.DiscoveryQuestionCollection())
	//get get Like question collection
	likeQuestionCollection := db.Collection(s.DiscoveryQuestionLikesCollection())

	//get questions from database and check for errors
	questionModels, err := s.getQuestions(ctx, questionsCollection, pageData)

	if err != nil {
		return nil, err
	}

	//loop through question models and create question dto
	for _, question := range questionModels {

		//create question dto
		var dto questions.DTO

		// set question and publicId Value for front ent
		dto.ID = question.PublicId
		dto.Question = question.Question

		//get user by id and check for error
		user, err := s.user.FindUserById(ctx, db, question.Author)

		if err != nil {
			return nil, err
		}

		//get use (Author) first and last name and capitalize first letter of first and last name
		firstName := strings.ToUpper(user.FirstName[0:1]) + strings.ToLower(user.FirstName[1:])
		lastName := strings.ToUpper(user.LastName[0:1]) + strings.ToLower(user.LastName[1:])

		//get my vote filter
		myVoteFilter := s.FilterMyLike(user.ID, question.ID)

		//query like by user and question and check for error
		likeResult, err := s.FindMyLike(ctx, likeQuestionCollection, myVoteFilter)

		//check for error excluding not found error
		if err != nil && err.Error() != mongo.ErrNoDocuments.Error() {
			return nil, err
		}

		//if like not found my vote is false indicating user has not voted
		//if like found get like and set my vote to like.Liked true or false
		if err != nil && err.Error() == mongo.ErrNoDocuments.Error() {

			dto.MyVote = false
			dto.Voted = false

		} else {

			like, err := s.MyLikeModel(likeResult)

			if err != nil {
				return nil, err
			}

			dto.Voted = true
			dto.MyVote = like.Liked
		}

		//like and dislike filters
		dislike := s.FilterLike(false)
		like := s.FilterLike(true)

		//get count of likes and dislikes and check for error
		dislikeCount, err := likeQuestionCollection.CountDocuments(ctx, dislike)

		if err != nil {
			return nil, err
		}

		likeCount, err := likeQuestionCollection.CountDocuments(ctx, like)

		if err != nil {
			return nil, err
		}

		dto.VoteUP = likeCount
		dto.VoteDown = dislikeCount

		dto.Author = firstName + " " + lastName
		dto.Updated = question.UpdatedAt

		println("dto", dto.Voted)
		dtos = append(dtos, dto)
	}

	return dtos, nil
}

func (s *Service) FindMyLike(ctx context.Context,
	collection *mongo.Collection,
	filter bson.M) (*mongo.SingleResult, error) {

	result := collection.FindOne(ctx, filter)

	if result.Err() != nil {
		return nil, result.Err()
	}

	return result, nil
}

func (s *Service) MyLikeModel(result *mongo.SingleResult) (discoveryquestionlikes.Model, error) {
	var like discoveryquestionlikes.Model

	err := result.Decode(&like)

	if err != nil {
		return like, err
	}

	return like, nil
}

func (s *Service) NewLikeDiscoveryQuestion(question_id, user_id primitive.ObjectID, liked bool) bson.D {

	now := time.Now()

	return bson.D{
		{Key: "question_id", Value: question_id},
		{Key: "user_id", Value: user_id},
		{Key: "liked", Value: liked},
		{Key: "created_at", Value: now},
		{Key: "updated_at", Value: now},
	}

}

func (s *Service) NewDiscoveryQuestion(ctx context.Context,
	collection *mongo.Collection,
	saveQuestion questions.SaveQuestion) (*mongo.InsertOneResult, error) {

	//set public id
	publicId, err := s.generatePublicId(ctx, collection)

	if err != nil {
		return nil, err

	}

	saveQuestion.PublicId = publicId

	result, err := collection.InsertOne(ctx, saveQuestion)

	if err != nil {
		return nil, err
	}

	return result, nil

}

// ResultToModel converts a mongo result to a model and checks for error
func (s *Service) ResultToModel(result *mongo.SingleResult) (questions.Model, error) {

	var model questions.Model

	err := result.Decode(&model)

	if err != nil {
		return model, err
	}

	return model, nil
}

func (s *Service) save(ctx context.Context, collection *mongo.Collection, question interface{}) (*mongo.InsertOneResult, error) {
	// get questions from database

	result, err := collection.InsertOne(ctx, question)

	if err != nil {
		return nil, err
	}

	return result, nil

}

func (s *Service) UpdateLike(like bool) bson.M {
	return bson.M{"$set": bson.M{"liked": like, "updated_at": time.Now()}}
}
