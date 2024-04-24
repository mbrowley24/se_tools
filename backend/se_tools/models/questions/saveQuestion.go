package questions

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SaveQuestion struct {
	PublicId   string               `bson:"public_id"`
	Question   string               `bson:"question"`
	Categories []primitive.ObjectID `bson:"categories"` // Category ID
	Industries []primitive.ObjectID `bson:"industries"` // Industry ID
	Author     primitive.ObjectID   `bson:"author"`     // User ID
	CreatedAt  time.Time            `bson:"created_at"`
	UpdatedAt  time.Time            `bson:"updated_at"`
}
