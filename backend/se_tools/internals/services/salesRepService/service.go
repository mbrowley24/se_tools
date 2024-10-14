package salesrepservice

import (
	"go.mongodb.org/mongo-driver/mongo"
	"se_tools/utils"
)

type Service struct {
	Collection *mongo.Collection
	utils      *utils.Utilities
}

func Start(collection *mongo.Collection, utils *utils.Utilities) *Service {

	return &Service{
		Collection: collection,
		utils:      utils,
	}
}
