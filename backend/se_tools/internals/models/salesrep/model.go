package salesrep

import (
	"fmt"
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

func (m *Model) ModelToSummary() Summary {

	var coverageList []string

	for _, se := range m.CoverageSE {

		name := fmt.Sprintf("%s %s", se.FirstName, se.LastName)

		coverageList = append(coverageList, name)
	}

	return Summary{
		Id:            m.PublicId,
		FirstName:     m.FirstName,
		LastName:      m.LastName,
		Email:         m.Email,
		Phone:         m.Phone,
		SalesEngineer: fmt.Sprintf("%s%s", m.SalesEngineer.FirstName, m.SalesEngineer.LastName),
		CoverageSE:    coverageList,
		Role:          m.Role.Name,
		Quota:         m.Quota,
		UpdateAt:      m.UpdateAt,
	}
}
