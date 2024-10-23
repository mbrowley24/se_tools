package Contact

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type Contact struct {
	ID        primitive.ObjectID   `json:"_id" bson:"_id"`
	PublicId  string               `json:"public_id" bson:"public_id"`
	FirstName string               `json:"first_name" bson:"first_name"`
	LastName  string               `json:"last_name" bson:"last_name"`
	Email     string               `json:"email" bson:"email"`
	Phone     string               `json:"phone" bson:"phone"`
	Company   []primitive.ObjectID `json:"company" bson:"company"`
	CreatedAt time.Time            `json:"created_at" bson:"created_at"`
	UpdatedAt time.Time            `json:"updated_at" bson:"updated_at"`
}
