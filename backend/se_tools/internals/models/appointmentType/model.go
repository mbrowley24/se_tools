package appointmentType

import "go.mongodb.org/mongo-driver/bson/primitive"

type Model struct {
	ID       primitive.ObjectID `json:"_id" bson:"_id"`
	PublicId string             `json:"public_id" bson:"public_id"`
	Name     string             `json:"name" bson:"name"`
}
