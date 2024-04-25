package discoveryquestionlikes

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Like struct {
	QuestionId primitive.ObjectID `bson:"question_id"`
	UserId     primitive.ObjectID `bson:"user_id"`
	Liked      bool               `bson:"liked"` // true for like, false for dislike
	CreatedAt  time.Time          `bson:"created_at"`
	UpdatedAt  time.Time          `bson:"updated_at"`
}
