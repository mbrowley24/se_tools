package salesrep

import (
	"se_tools/internals/models/appUser"
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
	Quota         float64            `bson:"quota"`
	CreatedAt     time.Time          `bson:"created_at"`
	UpdateAt      time.Time          `bson:"updated_at"`
}

func (m *Model) ModelToDTO() DTO {

	var coverageSe []appUser.DTO

	//covert embedded SE to Se DTO
	for _, se := range m.CoverageSE {

		coverageSe = append(coverageSe, se.ModelToDTO())
	}

	return DTO{
		Id:            m.PublicId,
		FirstName:     m.FirstName,
		LastName:      m.LastName,
		Email:         m.Email,
		Phone:         m.Phone,
		SalesEngineer: m.SalesEngineer.ModelToDTO(),
		CoverageSE:    coverageSe,
		Role:          m.Role.ModelToOption(),
		Quota:         m.Quota,
	}
}
