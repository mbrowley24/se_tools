package industry

import (
	optionsdto "se_tools/internals/models/optionsDto"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	PublicId  string             `bson:"public_id" json:"public_id"`
	Name      string             `bson:"name" json:"name"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updated_at"`
}

func (m *Model) ToOption() optionsdto.Option {

	return optionsdto.Option{
		Value: m.PublicId,
		Name:  m.Name,
	}
}
