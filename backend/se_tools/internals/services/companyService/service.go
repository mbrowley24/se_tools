package companyservice

import (
	"se_tools/utils"

	"go.mongodb.org/mongo-driver/mongo"
)

type Service struct {
	collection *mongo.Collection
	utils      *utils.Utilities
}

// Start starts user service
func Start(collection *mongo.Collection, utils *utils.Utilities) *Service {

	return &Service{
		collection: collection,
		utils:      utils,
	}
}
