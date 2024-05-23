package salesopportunitystatusservice

import (
	"context"
	"path/filepath"
	"se_tools/models/opportunitystatus"
	optionsdto "se_tools/models/optionsDto"
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
	Collection repository.Collection
	utils      utils.Utilities
}

// SalesOpportunityStatus returns the sales opportunity status collection
func (s *Service) SalesOpportunityStatusCollection(db *mongo.Database) *mongo.Collection {
	return db.Collection(s.Collection.SalesOpportunitiesStatus())
}

// NewService creates a new sales opportunity statuses
func (s *Service) CreateStatuses(ctx context.Context, db *mongo.Database) error {

	absPath, err := filepath.Abs("services/salesopportunitystatusservice/status.txt")

	if err != nil {

		return err

	}

	file, err := s.utils.OpenFile(absPath)
	defer func() error {
		err := file.Close()

		if err != nil {
			return err
		}

		return nil
	}()

	if err != nil {
		return err
	}

	scanner := s.utils.OpenScanner(file)

	var statusObjSlice []interface{}

	collection := s.SalesOpportunityStatusCollection(db)

	for scanner.Scan() {

		//get the status string
		statusString := scanner.Text()

		//split the status string
		statusSlice := strings.Split(statusString, ":")

		// create filter for checking the status
		filter := s.FilterByName(statusSlice[0])

		//get the count and checking for error
		count, err := collection.CountDocuments(ctx, filter)

		if err != nil {

			return err
		}

		//if the count is greater than 0, then the status already exists
		if count > 0 {
			continue
		}

		publicId, err := s.GeneratePublicID(ctx, db)

		if err != nil {

			return err
		}

		now := time.Now()

		//create the status
		status := bson.D{{Key: "public_id", Value: publicId},
			{Key: "name", Value: statusSlice[0]},
			{Key: "description", Value: statusSlice[1]},
			{Key: "created_at", Value: now},
			{Key: "updated_at", Value: now}}

		statusObjSlice = append(statusObjSlice, status)
	}

	if len(statusObjSlice) > 0 {

		//insert the statuses
		_, err = collection.InsertMany(ctx, statusObjSlice)

		if err != nil {

			return err
		}
	}

	return nil

}

// filter by id
func (s *Service) FilterById(id primitive.ObjectID) bson.M {
	return bson.M{"_id": id}
}

// filter by name
func (s *Service) FilterByName(name string) bson.M {
	return bson.M{"name": name}
}

func (s *Service) FilterByWon() bson.M {
	return bson.M{"name": "Closed/Won"}
}

func (s *Service) FilterByLost() bson.M {
	return bson.M{"name": "Closed/Lost"}
}

func (s *Service) FilterByPublicId(publicId string) bson.M {
	return bson.M{"public_id": publicId}
}

func (s *Service) FindById(ctx context.Context, db *mongo.Database, id primitive.ObjectID) (opportunitystatus.Model, error) {

	collection := s.SalesOpportunityStatusCollection(db)

	filter := s.FilterById(id)

	result := collection.FindOne(ctx, filter)

	model, err := s.ResultToModel(ctx, result)

	if err != nil {
		return model, err
	}

	return model, nil
}

func (s *Service) FindByPublicId(ctx context.Context, db *mongo.Database, publicId string) (opportunitystatus.Model, error) {

	var model opportunitystatus.Model

	collection := s.SalesOpportunityStatusCollection(db)

	filter := s.FilterByPublicId(publicId)

	err := collection.FindOne(ctx, filter).Decode(&model)

	if err != nil {
		return model, err
	}

	return model, nil
}

func (s *Service) GeneratePublicID(ctx context.Context, db *mongo.Database) (string, error) {

	collection := s.SalesOpportunityStatusCollection(db)

	for {

		publicId := s.utils.RandomStringGenerator(30)

		filter := s.FilterByPublicId(publicId)

		count, err := collection.CountDocuments(ctx, filter)

		if err != nil {
			return "", err
		}

		if count == 0 {
			return publicId, nil
		}

	}

}

func (s *Service) OpportunityStatusOptions(ctx context.Context, db *mongo.Database) ([]optionsdto.Option, error) {

	collection := s.SalesOpportunityStatusCollection(db)

	opts := options.Find().SetSort(bson.D{{Key: "name", Value: 1}})

	cursor, err := collection.Find(ctx, bson.M{}, opts)

	if err != nil {
		return nil, err
	}

	defer func() {

		err := cursor.Close(ctx)

		if err != nil {
			panic(err)
		}

	}()

	models, err := s.ResultsModels(ctx, cursor)

	if err != nil {
		return nil, err
	}

	var options []optionsdto.Option

	for _, model := range models {
		options = append(options, model.GetOptions())
	}

	return options, nil
}

func (s *Service) ResultToModel(ctx context.Context, result *mongo.SingleResult) (opportunitystatus.Model, error) {

	var model opportunitystatus.Model

	err := result.Decode(&model)

	if err != nil {
		return model, err
	}

	return model, nil
}

func (s *Service) ResultsModels(ctx context.Context, cursor *mongo.Cursor) ([]opportunitystatus.Model, error) {
	var models []opportunitystatus.Model

	err := cursor.All(ctx, &models)

	if err != nil {
		return nil, err
	}

	return models, nil
}
