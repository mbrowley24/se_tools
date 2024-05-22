package salesopportunityservice

import (
	"context"
	pagedata "se_tools/models/pageData"
	salesopportunity "se_tools/models/salesOpportunity"
	"se_tools/repository"
	salesrepservice "se_tools/services/salesRepService"
	"se_tools/services/salesopportunitystatusservice"
	userservice "se_tools/services/userService"
	"se_tools/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Service struct {
	Collection            repository.Collection
	salesRepService       salesrepservice.Service
	salesOppStatusService salesopportunitystatusservice.Service
	userservice           userservice.UserService
	seService             userservice.Service
	utils                 utils.Utilities
}

// get opportunity collection
func (s *Service) SalesOpportunityCollection(db *mongo.Database) *mongo.Collection {
	return db.Collection(s.Collection.SalesOpportunities())
}

func (s *Service) FilterBySalesEngineer(id primitive.ObjectID) bson.M {
	return bson.M{"sales_engineer": id}
}

func (s *Service) GenerateByPublicId(ctx context.Context, db *mongo.Database) (string, error) {

	//get collection
	collection := s.SalesOpportunityCollection(db)

	for {

		//generate public id
		publicId := s.utils.RandomStringGenerator(30)

		//check if public id exists
		count, err := collection.CountDocuments(ctx, bson.M{"public_id": publicId})

		if err != nil {
			return "", err
		}

		if count == 0 {
			return publicId, nil
		}

	}
}

func (s *Service) FindBySalesEngineer(ctx context.Context, db *mongo.Database, id primitive.ObjectID, pageInfo pagedata.DTO) (pagedata.Page, error) {

	//get collection
	collection := s.SalesOpportunityCollection(db)

	//page container
	var page pagedata.Page

	//get filter by sales engineer
	filter := s.FilterBySalesEngineer(id)

	//set page options for mongo
	//opt := options.Find().SetLimit(pageInfo.Limit).SetSkip(pageInfo.Offset)

	//get cursor and check for errors
	cursor, err := collection.Find(ctx, bson.M{}, nil)

	if err != nil {

		return page, err
	}

	//get count of documents and check for errors
	count, err := collection.CountDocuments(ctx, filter)

	if err != nil {
		return page, err
	}

	//calculate page data
	pageInfo.CalculatePageData(count)

	//assign values to page
	page.Page = pageInfo

	//turn cursor into model
	results, err := s.ResultsModels(ctx, cursor)

	if err != nil {
		return page, err
	}

	//get summaries and check for errors
	summaries, err := s.SalesOpportunitiesSummaries(ctx, db, results)

	if err != nil {

		return page, err
	}

	//assign values to page
	page.Items = summaries

	return page, nil
}

func (s *Service) ResultsModels(ctx context.Context, cursor *mongo.Cursor) ([]salesopportunity.Model, error) {

	var results []salesopportunity.Model

	err := cursor.All(ctx, &results)

	if err != nil {
		return nil, err
	}

	return results, nil
}

// func (s *Service) SalesOpportunitiesStatuses(ctx context.Context, db *mongo.Database) ([]salesopportunity.Model, error) {

// 	//get collection
// 	collection := s.salesOppStatusService.SalesOpportunityStatusCollection(db)

// 	//get all statuses
// 	cursor, err := collection.Find(ctx, bson.M{})

// 	if err != nil {
// 		return nil, err
// 	}

// 	statuses, err := s.ResultsModels(ctx, cursor)

// 	if err != nil {
// 		return nil, err
// 	}

// 	return statuses, nil
// }

// get opportunity summary collection
func (s *Service) SalesOpportunitySummary(ctx context.Context, db *mongo.Database, opp salesopportunity.Model) (salesopportunity.Sumary, error) {

	//create a summary object
	var summary salesopportunity.Sumary
	//assign values to the summary object
	summary.ID = opp.PublicId
	summary.Name = opp.Name
	summary.Amount = opp.Amount
	summary.CloseDate = opp.CloseDate
	summary.Description = opp.Description
	summary.UpdatedAt = opp.UpdatedAt

	salesRepName, err := s.salesRepService.FindById(ctx, db, opp.SalesRep)

	if err != nil {
		return summary, err
	}

	summary.SalesRep = s.salesRepService.SalesRepName(salesRepName)

	status, err := s.salesOppStatusService.FindById(ctx, db, opp.Status)

	if err != nil {

		return summary, err
	}

	summary.Status = status.PublicId

	salesEng, err := s.userservice.FindUserById(ctx, db, opp.SalesEngineer)

	if err != nil {

		return summary, err
	}

	summary.SalesEngineer = s.seService.SaleEngineerOption(salesEng)

	return summary, nil
}

func (s *Service) SalesOpportunitiesSummaries(ctx context.Context,
	db *mongo.Database,
	opps []salesopportunity.Model) ([]salesopportunity.Sumary, error) {

	var summaries []salesopportunity.Sumary

	for _, opp := range opps {

		summary, err := s.SalesOpportunitySummary(ctx, db, opp)

		if err != nil {
			return summaries, err
		}

		summaries = append(summaries, summary)
	}

	return summaries, nil
}

func (s *Service) Save(ctx context.Context, db *mongo.Database, model interface{}) (*mongo.InsertOneResult, error) {

	//get collection
	collection := s.SalesOpportunityCollection(db)

	//get sales opportunity model

	//insert model into collection
	_, err := collection.InsertOne(ctx, model)

	if err != nil {
		return nil, err
	}

	return nil, err
}

// end of month date
func (s *Service) EndOfMonthDate() time.Time {

	//current date
	now := time.Now()

	//place holder for end of month date
	var endOfMonthDate time.Time

	//current day
	day := now.Day()

	if day > 21 {

		endOfMonthDate = time.Date(now.Year(), now.Month()+1, 210, 0, 0, 0, 0, time.UTC)

	} else {

		endOfMonthDate = time.Date(now.Year(), now.Month(), 21, 0, 0, 0, 0, time.UTC)
	}

	return endOfMonthDate
}

// date two months out
func (s *Service) TwoMonthDate() time.Time {

	//current date
	now := time.Now()

	//place holder for end of month date
	var endOfMonthDate time.Time

	//current day
	day := now.Day()

	if day > 21 {

		endOfMonthDate = time.Date(now.Year(), now.Month()+2, 21, 0, 0, 0, 0, time.UTC)

	} else {

		endOfMonthDate = time.Date(now.Year(), now.Month()+1, 21, 0, 0, 0, 0, time.UTC)
	}

	return endOfMonthDate
}

// date three months out
func (s *Service) ThreeMonthDate() time.Time {

	//current date
	now := time.Now()

	//place holder for end of month date
	var endOfMonthDate time.Time

	//current day
	day := now.Day()

	if day > 21 {

		endOfMonthDate = time.Date(now.Year(), now.Month()+3, 21, 0, 0, 0, 0, time.UTC)

	} else {

		endOfMonthDate = time.Date(now.Year(), now.Month()+2, 21, 0, 0, 0, 0, time.UTC)
	}

	return endOfMonthDate
}

// date four months out
func (s *Service) FourMonthDate() time.Time {

	//current date
	now := time.Now()

	//place holder for end of month date
	var endOfMonthDate time.Time

	//current day
	day := now.Day()

	if day > 21 {

		endOfMonthDate = time.Date(now.Year(), now.Month()+4, 21, 0, 0, 0, 0, time.UTC)

	} else {

		endOfMonthDate = time.Date(now.Year(), now.Month()+3, 21, 0, 0, 0, 0, time.UTC)
	}

	return endOfMonthDate
}
