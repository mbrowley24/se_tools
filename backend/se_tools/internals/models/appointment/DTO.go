package appointment

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/appointmentType"
	"se_tools/internals/models/company"
	optionsdto "se_tools/internals/models/optionsDto"
	"se_tools/internals/models/products"
	"se_tools/internals/models/salesrep"
	"time"
)

type DTO struct {
	ID             primitive.ObjectID    `bson:"_id,omitempty" json:"_id,omitempty"`
	PublicId       string                `bson:"public_id"`
	Type           appointmentType.Model `bson:"type"`
	Company        company.Model         `bson:"company"`
	Description    string                `bson:"description"`
	SalesRep       salesrep.Model        `bson:"salesRep"`
	Date           time.Time             `bson:"date"`
	SalesEngineer  appUser.User          `bson:"sales_engineer"`
	ConvertedToOpp bool                  `json:"converted_to_opp"`
	Products       []products.Model      `bson:"products"`
	Notes          string                `bson:"notes"`
	InPerson       bool                  `bson:"in_person"`
	Offset         string                `bson:"offset"`
	CreatedAt      time.Time             `bson:"created_at"`
	UpdatedAt      time.Time             `bson:"updated_at"`
}

func (d *DTO) ModelToSummary() (Summary, error) {

	var prods []optionsdto.Option

	for _, product := range d.Products {

		prods = append(prods, optionsdto.Option{
			Value: product.PublicId,
			Name:  product.Name,
		})
	}

	return Summary{
		ID: d.PublicId,
		Type: optionsdto.Option{
			Value: d.Type.PublicId,
			Name:  d.Type.Name,
		},
		Company: optionsdto.Option{
			Value: d.Company.PublicId,
			Name:  d.Company.Name,
		},
		SalesRep: optionsdto.Option{
			Value: d.SalesRep.PublicId,
			Name:  fmt.Sprintf("%s %s", d.SalesRep.FirstName, d.SalesRep.LastName),
		},
		Date:      d.CreatedAt,
		Product:   len(d.Products),
		Products:  prods,
		UpdatedAt: d.UpdatedAt,
	}, nil
}
