package salesrepstatus

import "go.mongodb.org/mongo-driver/bson/primitive"

type Model struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	PublicId  string             `bson:"public_id"`
	Name      string             `bson:"name"`
	CreatedAt string             `bson:"created_at"`
	UpdatedAt string             `bson:"updated_at"`
}
