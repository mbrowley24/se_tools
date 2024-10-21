package company

import (
	"fmt"
	"se_tools/internals/models/Contact"
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
	CoverageSe    []appUser.Embedded `bson:"coverage_se"`
	Contacts      []Contact.Contact  `bson:"contacts"`
	CreatedBy     appUser.Embedded   `bson:"created_by"`
	Industry      industry.Model     `bson:"industry"`
	Notes         string             `bson:"notes"`
	SalesEngineer appUser.Embedded   `bson:"sales_engineer"`
	SalesRep      salesrep.Embedded  `bson:"sales_rep"`
	CreatedAt     time.Time          `bson:"created_at"`
	UpdatedAt     time.Time          `bson:"updated_at"`
}

func (m *Model) ToDTO() Summary {

	return Summary{
		ID:        m.PublicId,
		Name:      m.Name,
		Industry:  m.Industry.Name,
		SalesRep:  fmt.Sprintf("%s %s", m.SalesRep.FirstName, m.SalesRep.LastName),
		UpdatedAt: m.UpdatedAt,
	}
}
