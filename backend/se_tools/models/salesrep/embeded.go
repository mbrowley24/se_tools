package salesrep

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Embeded struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	PublicId  string             `bson:"public_id"`
	FirstName string             `bson:"first_name"`
	LastName  string             `bson:"last_name"`
	Email     string             `bson:"email"`
	UpdateAt  time.Time          `bson:"updated_at"`
}
