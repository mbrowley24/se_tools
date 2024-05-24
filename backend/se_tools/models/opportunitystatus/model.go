package opportunitystatus

import (
	optionsdto "se_tools/models/optionsDto"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`
	// PublicId is the public identifier of the sales opportunity
	PublicId string `bson:"public_id"`
	// Name is the name of the sales opportunity
	Name string `bson:"name"`
	// Description is the description of the sales opportunity
	Description string `bson:"description"`
	// CreatedAt is the date and time the sales opportunity was created
	CreatedAt primitive.DateTime `bson:"created_at"`
	// UpdatedAt is the date and time the sales opportunity was last updated
	UpdatedAt primitive.DateTime `bson:"updated_at"`
}

// get options
func (m *Model) GetOptions() optionsdto.Option {
	return optionsdto.Option{
		Value: m.PublicId,
		Name:  m.Name,
	}
}

func (m *Model) Embeded() Embeded {
	return Embeded{
		ID:          m.ID,
		PublicId:    m.PublicId,
		Name:        m.Name,
		Description: m.Description,
		UpdatedAt:   m.UpdatedAt,
	}
}
