package appointmentservice

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"se_tools/utils"
)

type AppointmentService struct {
	collection *mongo.Collection
	utils      *utils.Utilities
}

func New(collection *mongo.Collection, utils *utils.Utilities) *AppointmentService {
	return &AppointmentService{
		collection: collection,
		utils:      utils,
	}
}

func (a *AppointmentService) GetAppointments(ctx context.Context, filter bson.M, opts *options.FindOptions) (*mongo.Cursor, error) {

	results, err := a.collection.Find(ctx, filter, opts)

	if err != nil {
		return nil, err
	}

	return results, nil

}
