package salesroles

import (
	optionsdto "se_tools/models/optionsDto"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`
	// PublicId is the public identifier of the sales role
	PublicId string `bson:"public_id"`
	// Name is the name of the sales role
	Name string `bson:"name"`
	// Description is the description of the sales role
	Description string `bson:"description"`
	// CreatedAt is the time the sales role was created
	CreatedAt time.Time `bson:"created_at"`
	// UpdatedAt is the time the sales role was last updated
	UpdatedAt time.Time `bson:"updated_at"`
}

func (m *Model) ModelToOption() optionsdto.Option {
	return optionsdto.Option{
		Value: m.PublicId,
		Name:  m.Name,
	}
}
