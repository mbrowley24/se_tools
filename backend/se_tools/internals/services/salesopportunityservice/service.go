package salesopportunityservice

import (
	"context"
	pagedata2 "se_tools/internals/models/pageData"
	salesopportunity2 "se_tools/internals/models/salesOpportunity"
	"se_tools/internals/repository"
	"se_tools/internals/services/salesRepService"
	salesopportunity "se_tools/models/salesOpportunity"
	"se_tools/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Service struct {
	Collection      repository.Collection
	salesRepService salesrepservice.Service
	utils           utils.Utilities
}

// get opportunity collection
func (s *Service) SalesOpportunityCollection(db *mongo.Database) *mongo.Collection {
	return db.Collection(s.Collection.SalesOpportunities())
}

func (s *Service) FilterBySalesEngineer(id primitive.ObjectID) bson.M {
	return bson.M{"sales_engineer": id}
}

func (s *Service) FilterOppPrice(company, status primitive.ObjectID) bson.M {
	return bson.M{"company": company, "status": status}
}

func (s *Service) FilterByOpenStatus(won, lost, company primitive.ObjectID) bson.M {
	return bson.M{"$or": []bson.M{{"status": bson.M{"$ne": won}}, {"status": bson.M{"$ne": lost}}, {"company": company}}}
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

func (s *Service) FindBySalesEngineer(ctx context.Context, db *mongo.Database, id primitive.ObjectID, pageInfo pagedata2.DTO) (pagedata2.Page, error) {

	//get collection
	collection := s.SalesOpportunityCollection(db)

	//page container
	var page pagedata2.Page

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

func (s *Service) OppPrice(ctx context.Context, db *mongo.Database, filter bson.M) (float64, error) {

	value := 0.0

	//get collection
	collection := s.SalesOpportunityCollection(db)

	//get cursor and check for errors
	cursor, err := collection.Find(ctx, filter)

	if err != nil {

		return 0, err
	}

	//turn cursor into model
	results, err := s.ResultsModels(ctx, cursor)

	if err != nil {
		return 0, err

	}

	for _, result := range results {

		//result value
		resultValue := result.Amount

		//add result value to value
		value += resultValue
	}

	return value, nil

}

func (s *Service) ResultsModels(ctx context.Context, cursor *mongo.Cursor) ([]salesopportunity2.Model, error) {

	var results []salesopportunity2.Model

	err := cursor.All(ctx, &results)

	if err != nil {
		return nil, err
	}

	return results, nil
}

// get opportunity summary collection
func (s *Service) SalesOpportunitySummary(ctx context.Context, db *mongo.Database, opp salesopportunity2.Model) (salesopportunity.Sumary, error) {

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

	summary.SalesRep = salesRepName.PublicId

	summary.Status = opp.Status.PublicId

	summary.SalesEngineer = opp.SalesEngineer.PublicId

	return summary, nil
}

func (s *Service) SalesOpportunitiesSummaries(ctx context.Context,
	db *mongo.Database,
	opps []salesopportunity2.Model) ([]salesopportunity.Sumary, error) {

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
