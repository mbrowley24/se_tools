package appointmentType

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	optionsdto "se_tools/internals/models/optionsDto"
)

type Model struct {
	ID       primitive.ObjectID `json:"_id" bson:"_id"`
	PublicId string             `json:"public_id" bson:"public_id"`
	Name     string             `json:"name" bson:"name"`
}

func (m *Model) ToOption() optionsdto.Option {

	return optionsdto.Option{
		Value: m.PublicId,
		Name:  m.Name,
	}
}
