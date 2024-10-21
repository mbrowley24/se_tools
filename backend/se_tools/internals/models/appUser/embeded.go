package appUser

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Embedded struct {
	Id       primitive.ObjectID `bson:"_id,omitempty"`
	PublicId string             `bson:"public_id"`
}
