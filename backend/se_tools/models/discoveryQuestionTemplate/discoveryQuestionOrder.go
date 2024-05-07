package discoveryquestiontemplate

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type QuestionOrder struct {
	ID         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Order      int                `json:"order" bson:"order"`
	TemplateId primitive.ObjectID `json:"template_id" bson:"template_id"`
	QuestionId primitive.ObjectID `json:"question_id" bson:"question_id"`
	CreatedAt  time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt  time.Time          `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}
