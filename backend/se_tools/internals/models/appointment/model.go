package appointment

import (
	"fmt"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/appointmentType"
	"se_tools/internals/models/company"
	"se_tools/internals/models/products"
	"se_tools/internals/models/salesrep"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	ID             primitive.ObjectID    `bson:"_id,omitempty" json:"_id,omitempty"`
	PublicId       string                `bson:"public_id"`
	Name           string                `bson:"name"`
	Type           appointmentType.Model `bson:"type"`
	Company        company.Model         `bson:"company"`
	Description    string                `bson:"description"`
	SalesRep       salesrep.Embedded     `bson:"salesRep"`
	Date           time.Time             `bson:"date"`
	SalesEngineer  appUser.Embedded      `bson:"sales_engineer"`
	ConvertedToOpp bool                  `json:"converted_to_opp"`
	Products       []products.Model      `bson:"products"`
	Notes          string                `bson:"notes"`
	InPerson       bool                  `bson:"in_person"`
	Offset         string                `bson:"offset"`
	CreatedAt      time.Time             `bson:"created_at"`
	UpdatedAt      time.Time             `bson:"updated_at"`
}

func (m *Model) ModelToSummary() (Summary, error) {

	location, err := time.LoadLocation(m.Offset)
	if err != nil {
		return Summary{}, err
	}

	var productNames []string

	for _, prod := range m.Products {

		productNames = append(productNames, prod.Name)
	}

	return Summary{
		ID:        m.PublicId,
		Name:      m.Name,
		Type:      m.Type.Name,
		Company:   m.Company.Name,
		SalesRep:  fmt.Sprintf("%s, %s", m.SalesRep.LastName, m.SalesRep.FirstName),
		Date:      m.Date.In(location),
		Product:   len(m.Products),
		Products:  productNames,
		UpdatedAt: m.UpdatedAt.In(location),
	}, nil
}
