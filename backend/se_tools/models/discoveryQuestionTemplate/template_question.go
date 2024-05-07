package discoveryquestiontemplate

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TemplateQuestion struct {
	ID         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	TemplateId primitive.ObjectID `json:"template_id,omitempty" bson:"template_id,omitempty"`
	QuestionId primitive.ObjectID `json:"question_id,omitempty" bson:"question_id,omitempty"`
	Order      int64              `json:"order,omitempty" bson:"order,omitempty"`
	CreatedAt  time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdateAt   time.Time          `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}
