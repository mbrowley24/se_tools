package appointment

import (
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/appointmentType"
	"se_tools/internals/models/company"
	"se_tools/internals/models/products"
	"se_tools/internals/models/salesrep"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	ID               primitive.ObjectID    `bson:"_id,omitempty" json:"_id,omitempty"`
	PublicId         string                `bson:"public_id"`
	Name             string                `bson:"name"`
	Type             appointmentType.Model `bson:"type"`
	Company          company.Model         `bson:"company"`
	Description      string                `bson:"description"`
	SalesRep         salesrep.Embedded     `bson:"salesRep"`
	Date             time.Time             `bson:"date"`
	SalesEngineer    appUser.Embedded      `bson:"sales_engineer"`
	CoverageSe       []appUser.Embedded    `bson:"coverage_se"`
	ConvertedToOpp   bool                  `json:"converted_to_opp"`
	Products         []products.Model      `bson:"products"`
	Notes            string                `bson:"notes"`
	InPerson         bool                  `bson:"in_person"`
	SalesOpportunity primitive.ObjectID    `bson:"sales_opportunity_id"`
	Offset           time.Location         `bson:"offset"`
	CreatedAt        time.Time             `bson:"created_at"`
	UpdatedAt        time.Time             `bson:"updated_at"`
}
