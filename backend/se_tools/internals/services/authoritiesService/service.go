package authoritiesservice

import (
	"go.mongodb.org/mongo-driver/mongo"
	"se_tools/utils"
)

type Services struct {
	collection *mongo.Collection
	utils      *utils.Utilities
}

func Start(collection *mongo.Collection, utils *utils.Utilities) *Services {

	return &Services{
		collection: collection,
		utils:      utils,
	}
}

// CreateAuthorities creates authorities for inti values
