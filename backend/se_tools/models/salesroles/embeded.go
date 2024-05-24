package salesroles

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Embeded struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`
	// PublicId is the public identifier of the sales role
	PublicId string `bson:"public_id"`
	// Name is the name of the sales role
	Name string `bson:"name"`
	// Description is the description of the sales role
	Description string `bson:"description"`
	// UpdatedAt is the time the sales role was last updated
	UpdatedAt time.Time `bson:"updated_at"`
}
