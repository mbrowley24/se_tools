package appointmentType

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	optionsdto "se_tools/internals/models/optionsDto"
	"time"
)

type Model struct {
	ID        primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	PublicId  string             `json:"public_id" bson:"public_id"`
	Name      string             `json:"name" bson:"name"`
	CreatedAt time.Time          `json:"created_at" bson:"created_at"`
	UpdatedAt time.Time          `json:"updated_at" bson:"updated_at"`
}

func (m *Model) ToOption() optionsdto.Option {

	return optionsdto.Option{
		Value: m.PublicId,
		Name:  m.Name,
	}
}
