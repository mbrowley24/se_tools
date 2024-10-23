package appointment

import (
	"se_tools/internals/models/embedded"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	ID             primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	PublicId       string             `bson:"public_id"`
	Type           embedded.Model     `bson:"type"`
	Company        embedded.Model     `bson:"company"`
	Description    string             `bson:"description"`
	SalesRep       embedded.Model     `bson:"salesRep"`
	Date           time.Time          `bson:"date"`
	SalesEngineer  embedded.Model     `bson:"sales_engineer"`
	ConvertedToOpp bool               `json:"converted_to_opp"`
	Products       []embedded.Model   `bson:"products"`
	Notes          string             `bson:"notes"`
	InPerson       bool               `bson:"in_person"`
	Offset         string             `bson:"offset"`
	CreatedAt      time.Time          `bson:"created_at"`
	UpdatedAt      time.Time          `bson:"updated_at"`
}
