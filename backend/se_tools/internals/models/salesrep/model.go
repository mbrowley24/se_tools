package salesrep

import (
	"fmt"
	"se_tools/internals/models/appUser"
	optionsdto "se_tools/internals/models/optionsDto"
	"se_tools/internals/models/salesroles"
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
	SalesEngineer appUser.Embedded   `bson:"sales_engineer"`
	CoverageSE    []appUser.Embedded `bson:"coverage_se"`
	Role          salesroles.Model   `bson:"role"`
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

func (m *Model) ModelToEmbedded() Embedded {

	return Embedded{
		ID:        m.ID,
		PublicId:  m.PublicId,
		FirstName: m.FirstName,
		LastName:  m.LastName,
		Email:     m.Email,
		Role:      m.Role,
		Quota:     m.Quota,
	}

}

func (m *Model) ModelToSummary(firstName, lastName string) Summary {
	return Summary{
		Id:            m.PublicId,
		FirstName:     m.FirstName,
		LastName:      m.LastName,
		Email:         m.Email,
		Phone:         m.Phone,
		SalesEngineer: fmt.Sprintf("%s %s", firstName, lastName),
		Role:          m.Role.Name,
		Quota:         m.Quota,
		UpdateAt:      m.UpdateAt,
	}
}
