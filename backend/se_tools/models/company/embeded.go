package company

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Embeded struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`
	// PublicId is the public id of the account
	PublicId string `bson:"public_id"`
	// Name is the name of the account
	Name string `bson:"name"`
	//created by is the user who created the account
	CreatedAt time.Time `bson:"created_at"`
	// UpdatedAt is the date and time the account was last updated
	UpdatedAt time.Time `bson:"updated_at"`
}