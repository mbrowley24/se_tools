package company

import (
	"fmt"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/industry"
	"se_tools/internals/models/salesrep"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	ID            primitive.ObjectID `bson:"_id,omitempty"`
	PublicId      string             `bson:"public_id"`
	Name          string             `bson:"name"`
	Industry      industry.Model     `bson:"industry"`
	SalesEngineer appUser.Embedded   `bson:"sales_engineer"`
	CoverageSe    []appUser.Embedded `bson:"coverage_se"`
	SalesRep      salesrep.Embedded  `bson:"sales_rep"`
	CreatedBy     appUser.Embedded   `bson:"created_by"`
	CreatedAt     time.Time          `bson:"created_at"`
	UpdatedAt     time.Time          `bson:"updated_at"`
}

func (m *Model) ToDTO() Summary {

	var coverageSe []string

	for _, coverage := range m.CoverageSe {

		name := fmt.Sprintf("%ss %s", coverage.FirstName, coverage.LastName)
		coverageSe = append(coverageSe, name)
	}

	return Summary{
		ID:            m.PublicId,
		Name:          m.Name,
		Industry:      m.Industry.Name,
		SalesEngineer: fmt.Sprintf("%s %s", m.SalesEngineer.FirstName, m.SalesEngineer.LastName),
		CoverageSe:    coverageSe,
		SalesRep:      fmt.Sprintf("%s %s", m.SalesRep.FirstName, m.SalesRep.LastName),
		CreatedBy:     fmt.Sprintf("%s %s", m.CreatedBy.FirstName, m.CreatedBy.LastName),
		UpdatedAt:     m.UpdatedAt,
	}
}
