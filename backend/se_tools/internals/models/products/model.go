package products

import (
	optionsdto "se_tools/internals/models/optionsDto"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	PublicId    string             `bson:"public_id"`
	Name        string             `bson:"name"`
	Description string             `bson:"description"`
	CreatedAt   time.Time          `bson:"created_at"`
	UpdatedAt   time.Time          `bson:"updated_at"`
}

func (m *Model) ModelToDTO() optionsdto.Option {
	return optionsdto.Option{
		Value: m.PublicId,
		Name:  m.Name,
	}
}
