package discoverytemplates

import (
	"se_tools/repository"
	"se_tools/utils"

	"go.mongodb.org/mongo-driver/mongo"
)

type Service struct {
	collection repository.Collection
	utils      utils.Utilities
}

func (s *Service) Collection(db *mongo.Database) *mongo.Collection {

	return db.Collection(s.collection.TemplateQuestion())
}
