package embedded

import "go.mongodb.org/mongo-driver/bson/primitive"

type Model struct {
	Id       primitive.ObjectID `bson:"_id,omitempty"`
	PublicId string             `bson:"public_id"`
}
