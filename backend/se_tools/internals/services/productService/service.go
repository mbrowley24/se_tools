package productService

import (
	"go.mongodb.org/mongo-driver/mongo"
	"se_tools/utils"
)

type Service struct {
	collection *mongo.Collection
	Utils      *utils.Utilities
}

func Start(collection *mongo.Collection, utils *utils.Utilities) *Service {

	return &Service{
		collection: collection,
		Utils:      utils,
	}
}
