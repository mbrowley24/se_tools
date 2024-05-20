package salesrep

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	ID            primitive.ObjectID `bson:"_id,omitempty"`
	PublicId      string             `bson:"public_id"`
	FirstName     string             `bson:"first_name"`
	LastName      string             `bson:"last_name"`
	Email         string             `bson:"email"`
	Phone         string             `bson:"phone"`
	SalesEngineer primitive.ObjectID `bson:"sales_engineer"`
	Role          primitive.ObjectID `bson:"role"`
	Quota         float64            `bson:"quota"`
	CreatedAt     time.Time          `bson:"created_at"`
	UpdateAt      time.Time          `bson:"updated_at"`
}
