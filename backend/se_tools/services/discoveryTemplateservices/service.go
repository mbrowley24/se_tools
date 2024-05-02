package discoverytemplatesservices

import (
	"context"
	"fmt"
	discoveryquestiontemplate "se_tools/models/discoveryQuestionTemplate"
	pagedata "se_tools/models/pageData"
	"se_tools/repository"
	userservice "se_tools/services/userService"
	"se_tools/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Service struct {
	collection  repository.Collection
	userService userservice.UserService
	utils       utils.Utilities
}

func (s *Service) Collection(db *mongo.Database) *mongo.Collection {

	return db.Collection(s.collection.TemplateQuestion())
}

func (s *Service) existsByPublicId(ctx context.Context, collection *mongo.Collection, publicId string) (bool, error) {

	filter := s.FilterForPublicId(publicId)

	count, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func (s *Service) FilterById(id primitive.ObjectID) bson.M {

	return bson.M{"_id": id}
}

func (s *Service) FilterForPublicId(publicId string) bson.M {

	return bson.M{"public_id": publicId}
}

// generatePublicId generates a new publicId for a discovery question template
func (s *Service) generatePublicId(ctx context.Context, collection *mongo.Collection) (string, error) {

	for {

		//generate a new publicId
		publicId := s.utils.RandomStringGenerator(30)

		//check if publicId exists and check for errors
		exists, err := s.existsByPublicId(ctx, collection, publicId)

		if err != nil {
			return "", err
		}

		if !exists {
			return publicId, nil
		}

	}

}

// ModelToSummary converts a model to a summary
func (s *Service) ModelToSummary(ctx context.Context,
	db *mongo.Database,
	model discoveryquestiontemplate.Model) (discoveryquestiontemplate.Summary, error) {

	user, err := s.userService.FindUserById(ctx, db, model.Author)

	if err != nil {
		return discoveryquestiontemplate.Summary{}, err
	}

	author := fmt.Sprintf("%s %s", user.FirstName, user.LastName)

	return discoveryquestiontemplate.Summary{
		ID:        model.PublicID,
		Name:      model.Name,
		Author:    author,
		Questions: len(model.Questions),
		UpdateAt:  model.UpdateAt,
	}, nil
}

// ModelsToSummary converts a slice of models to a slice of summaries
func (s *Service) ModelsToSummary(ctx context.Context,
	db *mongo.Database,
	models []discoveryquestiontemplate.Model) ([]discoveryquestiontemplate.Summary, error) {

	var summaries []discoveryquestiontemplate.Summary

	for _, model := range models {

		summary, err := s.ModelToSummary(ctx, db, model)

		if err != nil {
			return nil, err
		}

		summaries = append(summaries, summary)
	}

	return summaries, nil
}

func (s *Service) NewTemplate(ctx context.Context,
	db *mongo.Database,
	newTemplate discoveryquestiontemplate.NewDiscoveryTemplate) (*mongo.InsertOneResult, error) {

	collection := s.Collection(db)

	templateBson, err := s.newTemplateBson(ctx, collection, newTemplate)

	if err != nil {
		return nil, err
	}

	result, err := collection.InsertOne(ctx, templateBson)

	if err != nil {
		return nil, err
	}

	return result, nil

}

func (s *Service) newTemplateBson(ctx context.Context,
	collection *mongo.Collection,
	template discoveryquestiontemplate.NewDiscoveryTemplate) (bson.M, error) {

	publicId, err := s.generatePublicId(ctx, collection)

	if err != nil {
		return nil, err
	}

	//current time
	now := time.Now()

	return bson.M{
		"public_id":  publicId,
		"name":       template.Name,
		"author":     template.Author,
		"questions":  []discoveryquestiontemplate.TemplateQuestion{},
		"created_at": now,
		"updated_at": now,
	}, nil
}

// ResultToModel converts a mongo result to a model
func (s *Service) ResultToModel(result *mongo.SingleResult) (discoveryquestiontemplate.Model, error) {

	var model discoveryquestiontemplate.Model

	err := result.Decode(&model)

	if err != nil {
		return model, err
	}

	return model, nil
}

// ResultsToModels converts a mongo cursor to a slice of models
func (s *Service) ResultsToModels(ctx context.Context, results *mongo.Cursor) ([]discoveryquestiontemplate.Model, error) {

	var models []discoveryquestiontemplate.Model

	err := results.All(ctx, &models)

	if err != nil {
		return nil, err
	}

	return models, nil
}

// FindAllTemplates returns all discovery question templates
func (s *Service) FindAllTemplates(ctx context.Context,
	db *mongo.Database,
	pageData pagedata.DTO) (discoveryquestiontemplate.DiscoveryTempSummaryPage, error) {

	var returnData discoveryquestiontemplate.DiscoveryTempSummaryPage

	//get discovery question template collection
	collection := s.Collection(db)

	//count total documents and check for errors
	count, err := collection.CountDocuments(ctx, bson.M{})

	if err != nil {
		return returnData, err
	}

	//calculate page data total values
	pageData.CalculatePageData(count)

	//set page info for return data
	returnData.PageInfo = pageData

	//get find options
	opts := options.Find().SetSkip(pageData.Offset).SetLimit(pageData.Limit)

	//get results and chck for errors
	results, err := collection.Find(ctx, bson.M{}, opts)

	if err != nil {
		return returnData, err
	}

	models, err := s.ResultsToModels(ctx, results)

	if err != nil {
		return returnData, err
	}

	//convert models to summaries
	summaries, err := s.ModelsToSummary(ctx, db, models)

	if err != nil {
		return returnData, err
	}

	returnData.Summaries = summaries

	return returnData, nil
}

func (s *Service) FindById(ctx context.Context, db *mongo.Database, id primitive.ObjectID) (discoveryquestiontemplate.Model, error) {

	collection := s.Collection(db)

	filter := s.FilterById(id)

	result := collection.FindOne(ctx, filter)

	return s.ResultToModel(result)
}
