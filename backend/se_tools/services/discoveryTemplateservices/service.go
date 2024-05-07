package discoverytemplatesservices

import (
	"context"
	"fmt"
	discoveryquestiontemplate "se_tools/models/discoveryQuestionTemplate"
	pagedata "se_tools/models/pageData"
	"se_tools/repository"
	discoveryquestionservices "se_tools/services/discoveryQuestionServices"
	userservice "se_tools/services/userService"
	"se_tools/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Service struct {
	collection        repository.Collection
	discoveryQuestion discoveryquestionservices.Service
	userService       userservice.UserService
	utils             utils.Utilities
}

// NewService returns discovery question collection
func (s *Service) Collection(db *mongo.Database) *mongo.Collection {

	return db.Collection(s.collection.TemplateQuestion())
}

// NewService returns a new discovery question template service
func (s *Service) CountQuestionOrder(ctx context.Context, db *mongo.Database, templateId primitive.ObjectID) (int64, error) {

	collection := s.TemplateQuestionOrderCollection(db)

	filter := s.FilterByTemplateId(templateId)

	count, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return 0, err
	}

	return count, nil
}

// DeleteOrderModel
func (s *Service) DeleteOrderModelById(ctx context.Context, db *mongo.Database,
	orderId primitive.ObjectID) (*mongo.DeleteResult, error) {

	collection := s.TemplateQuestionOrderCollection(db)

	filter := s.FilterById(orderId)

	result, err := collection.DeleteOne(ctx, filter)

	if err != nil {
		return nil, err

	}

	return result, nil

}

// DeleteOrderModelByTemplateId
func (s *Service) DeleteOrderModelByTemplateId(ctx context.Context, db *mongo.Database,
	templateId primitive.ObjectID) (*mongo.DeleteResult, error) {

	collection := s.TemplateQuestionOrderCollection(db)

	filter := s.FilterByTemplateId(templateId)

	result, err := collection.DeleteMany(ctx, filter)

	if err != nil {
		return nil, err

	}

	return result, nil

}

// TemplateQuestionOrderCollection returns a collection for template question order
func (s *Service) TemplateQuestionOrderCollection(db *mongo.Database) *mongo.Collection {

	return db.Collection(s.collection.TemplateQuestionOrder())
}

// existsByPublicId checks if a publicId exists in a collection and checks for errors
func (s *Service) existsByPublicId(ctx context.Context, collection *mongo.Collection, publicId string) (bool, error) {

	filter := s.FilterForPublicId(publicId)

	count, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

// FilterById returns a bson filter for an _id
func (s *Service) FilterById(id primitive.ObjectID) bson.M {

	return bson.M{"_id": id}
}

// FilterByTemplateId returns a bson filter for a template_id
func (s *Service) FilterByTemplateId(templateId primitive.ObjectID) bson.M {

	return bson.M{"template_id": templateId}
}

func (s *Service) FilterByTemplateIdAndQuestionId(templateId primitive.ObjectID, questionId primitive.ObjectID) bson.M {

	return bson.M{"template_id": templateId, "question_id": questionId}
}

// FilterForPublicId returns a bson filter for a publicId
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

	count, err := s.TemplateQuestionOrderCollection(db).CountDocuments(ctx, bson.M{"template_id": model.ID})

	if err != nil {
		return discoveryquestiontemplate.Summary{}, err

	}

	author := fmt.Sprintf("%s %s", user.FirstName, user.LastName)

	return discoveryquestiontemplate.Summary{
		ID:        model.PublicID,
		Name:      model.Name,
		Author:    author,
		Questions: count,
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

// NewTemplate creates a new discovery question template in db and checks for errors
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

// newTemplateBson creates a new bson document for a discovery question template and checks for errors
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
		"created_at": now,
		"updated_at": now,
	}, nil
}

func (s *Service) NewQuestionOrderBson(
	templateId primitive.ObjectID,
	questionId primitive.ObjectID,
	order int64) bson.M {

	now := time.Now()

	data := bson.M{
		"order":       order,
		"question_id": questionId,
		"template_id": templateId,
		"created_at":  now,
		"updated_at":  now,
	}

	return data
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

// ResultToTemplateQuestion converts a mongo result to a template question and checks for errors
func (s *Service) ResultToTemplateQuestion(result *mongo.SingleResult) (discoveryquestiontemplate.TemplateQuestion, error) {

	var model discoveryquestiontemplate.TemplateQuestion

	err := result.Decode(&model)

	if err != nil {
		return model, err
	}

	return model, nil
}

// ResultsToTemplateQuestions converts a mongo cursor to a slice of template questions and checks for errors
func (s *Service) ResultsToTemplateQuestions(ctx context.Context, results *mongo.Cursor) ([]discoveryquestiontemplate.TemplateQuestion, error) {

	var models []discoveryquestiontemplate.TemplateQuestion

	err := results.All(ctx, &models)

	if err != nil {
		return nil, err
	}

	return models, nil
}

// TemplateQuestionToTemplateSummary converts a template question to a template summary and checks for errors
func (s *Service) TemplateQuestionToTemplateSummary(ctx context.Context,
	db *mongo.Database,
	model discoveryquestiontemplate.TemplateQuestion) (discoveryquestiontemplate.TemplateQuestionSummary, error) {

	question, err := s.discoveryQuestion.FindById(ctx, db, model.QuestionId)

	if err != nil {
		return discoveryquestiontemplate.TemplateQuestionSummary{}, err
	}

	questionModel, err := s.discoveryQuestion.ResultToModel(question)

	if err != nil {
		return discoveryquestiontemplate.TemplateQuestionSummary{}, err
	}

	return discoveryquestiontemplate.TemplateQuestionSummary{
		ID:       questionModel.PublicId,
		Question: questionModel.Question,
		Order:    model.Order,
		UpdateAt: questionModel.UpdatedAt,
	}, nil
}

// TemplateQuestionsToTemplateSummaries converts a slice of template questions to a slice of template summaries and checks for errors
func (s *Service) TemplateQuestionsToTemplateSummaries(ctx context.Context,
	db *mongo.Database,
	models []discoveryquestiontemplate.TemplateQuestion) ([]discoveryquestiontemplate.TemplateQuestionSummary, error) {

	var summaries []discoveryquestiontemplate.TemplateQuestionSummary

	for _, model := range models {

		summary, err := s.TemplateQuestionToTemplateSummary(ctx, db, model)

		if err != nil {
			return nil, err
		}

		summaries = append(summaries, summary)
	}

	return summaries, nil
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

// FindById returns a discovery question template by id, checks for errors and returns a model
func (s *Service) FindById(ctx context.Context, db *mongo.Database, id primitive.ObjectID) (discoveryquestiontemplate.Model, error) {

	collection := s.Collection(db)

	filter := s.FilterById(id)

	result := collection.FindOne(ctx, filter)

	return s.ResultToModel(result)
}

// FindByPublicId returns a discovery question template by public id, checks for errors and returns a model
func (s *Service) FindByPublicId(ctx context.Context, db *mongo.Database, publicId string) (discoveryquestiontemplate.Model, error) {

	collection := s.Collection(db)

	filter := s.FilterForPublicId(publicId)

	result := collection.FindOne(ctx, filter)

	model, err := s.ResultToModel(result)

	if err != nil {
		return model, err
	}

	return model, nil
}

// FindTemplateQuestion returns a slice of template questions by template_id, checks for errors and returns a slice of template questions
func (s *Service) FindTemplateQuestions(ctx context.Context,
	db *mongo.Database,
	id primitive.ObjectID) ([]discoveryquestiontemplate.TemplateQuestion, error) {

	collection := s.TemplateQuestionOrderCollection(db)

	filter := s.FilterByTemplateId(id)

	results, err := collection.Find(ctx, filter)

	if err != nil {
		return nil, err

	}

	orderModels, err := s.ResultsToTemplateQuestions(ctx, results)

	if err != nil {

		return nil, err
	}

	return orderModels, nil
}

func (s *Service) QuestionExistsInTemplate(ctx context.Context,
	db *mongo.Database,
	templateId primitive.ObjectID,
	questionId primitive.ObjectID) (bool, error) {

	collection := s.TemplateQuestionOrderCollection(db)

	filter := s.FilterByTemplateIdAndQuestionId(templateId, questionId)

	count, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return false, err
	}

	return count > 0, nil

}
