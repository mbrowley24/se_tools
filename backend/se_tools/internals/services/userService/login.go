package userservice

import (
	"go.mongodb.org/mongo-driver/mongo"
	"se_tools/utils"
)

type LoginService struct {
	collection *mongo.Collection
	utils      utils.Utilities
}

func (l *LoginService) Start(collection *mongo.Collection) {

	l.collection = collection
}
