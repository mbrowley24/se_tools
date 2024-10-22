package company

import (
	"se_tools/internals/models/embedded"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	ID            primitive.ObjectID `bson:"_id,omitempty"`
	PublicId      string             `bson:"public_id"`
	Name          string             `bson:"name"`
	CoverageSe    []embedded.Model   `bson:"coverage_se"`
	Contacts      []embedded.Model   `bson:"contacts"`
	CreatedBy     embedded.Model     `bson:"created_by"`
	Industry      embedded.Model     `bson:"industry"`
	Notes         string             `bson:"notes"`
	SalesEngineer embedded.Model     `bson:"sales_engineer"`
	SalesRep      embedded.Model     `bson:"sales_rep"`
	CreatedAt     time.Time          `bson:"created_at"`
	UpdatedAt     time.Time          `bson:"updated_at"`
}
