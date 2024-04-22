package discoveryquestionlikes

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	ID         primitive.ObjectID `bson:"_id,omitempty"`
	QuestionId primitive.ObjectID `bson:"question_id"`
	UserId     primitive.ObjectID `bson:"user_id"`
	CreatedAt  time.Time          `bson:"created_at"`
	UpdatedAt  time.Time          `bson:"updated_at"`
}
