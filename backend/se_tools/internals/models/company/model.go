package company

import (
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
