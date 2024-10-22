package salesrep

import (
	"fmt"
	"se_tools/internals/models/embedded"
	optionsdto "se_tools/internals/models/optionsDto"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	ID            primitive.ObjectID `bson:"_id,omitempty"`
	PublicId      string             `bson:"public_id"`
	FirstName     string             `bson:"first_name"`
	LastName      string             `bson:"last_name"`
	Email         string             `bson:"email"`
	Phone         string             `bson:"phone"`
	SalesEngineer embedded.Model     `bson:"sales_engineer"`
	CoverageSE    []embedded.Model   `bson:"coverage_se"`
	Role          embedded.Model     `bson:"role"`
	Quota         int64              `bson:"quota"`
	Version       int                `bson:"v"`
	CreatedAt     time.Time          `bson:"created_at"`
	UpdateAt      time.Time          `bson:"updated_at"`
}

func (m *Model) ModelToOptions() optionsdto.Option {

	name := fmt.Sprintf("%s %s", m.FirstName, m.LastName)

	return optionsdto.Option{
		Value: m.PublicId,
		Name:  name,
	}
}

func (m *Model) ModelToEmbedded() embedded.Model {

	return embedded.Model{
		Id:       m.ID,
		PublicId: m.PublicId,
	}

}
