package company

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"se_tools/internals/models/Contact"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/industry"
	optionsdto "se_tools/internals/models/optionsDto"
	"time"
)

type DTO struct {
	ID            primitive.ObjectID `bson:"_id,omitempty"`
	PublicId      string             `bson:"public_id"`
	Name          string             `bson:"name"`
	CoverageSe    []appUser.User     `bson:"coverage_se"`
	Contacts      []Contact.Contact  `bson:"contacts"`
	CreatedBy     appUser.User       `bson:"created_by"`
	Industry      industry.Model     `bson:"industry"`
	Notes         string             `bson:"notes"`
	SalesEngineer appUser.User       `bson:"sales_engineer"`
	SalesRep      appUser.User       `bson:"sales_rep"`
	CreatedAt     time.Time          `bson:"created_at"`
	UpdatedAt     time.Time          `bson:"updated_at"`
}

func (d *DTO) ToSummary() Summary {

	var coverageSe []optionsdto.Option

	for _, se := range d.CoverageSe {

		coverageSe = append(coverageSe, optionsdto.Option{
			Value: se.PublicId,
			Name:  fmt.Sprintf("%s %s", se.FirstName, se.LastName),
		})
	}

	println(d.SalesEngineer.FirstName)
	println(d.SalesEngineer.Email)
	println(d.SalesEngineer.PublicId)
	println("read above")
	return Summary{
		ID:       d.PublicId,
		Name:     d.Name,
		Industry: optionsdto.Option{Value: d.Industry.PublicId, Name: d.Industry.Name},
		SalesEngineer: optionsdto.Option{
			Value: d.SalesEngineer.PublicId,
			Name:  fmt.Sprintf("%s %s", d.SalesEngineer.FirstName, d.SalesEngineer.LastName),
		},
		CoverageSe: coverageSe,
		SalesRep: optionsdto.Option{Value: d.SalesRep.PublicId,
			Name: fmt.Sprintf("%s %s", d.SalesRep.FirstName, d.SalesRep.LastName),
		},
		CreatedBy: optionsdto.Option{Value: d.CreatedBy.PublicId,
			Name: fmt.Sprintf("%s %s", d.CreatedBy.FirstName, d.CreatedBy.LastName),
		},
		CreatedAt: d.CreatedAt,
		UpdatedAt: d.UpdatedAt,
	}
}
