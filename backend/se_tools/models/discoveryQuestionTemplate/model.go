package discoveryquestiontemplate

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DiscoveryQuestionTemplate struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	PublicID  string             `json:"public_id,omitempty" bson:"public_id,omitempty"`
	Name      string             `json:"name,omitempty" bson:"name,omitempty"`
	Questions []TemplateQuestion `json:"questions,omitempty" bson:"questions,omitempty"`
	CreatedAt time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdateAt  time.Time          `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}
