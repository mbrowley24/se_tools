package company

import (
	"se_tools/internals/models/appUser"
	optionsdto "se_tools/internals/models/optionsDto"
	"se_tools/internals/models/salesrep"
	"time"
)

type DTO struct {
	ID            string            `json:"id"`
	Name          string            `json:"name"`
	Industry      optionsdto.Option `bson:"industry"`
	SalesEngineer appUser.DTO       `bson:"sales_engineer"`
	CoverageSe    []appUser.DTO     `bson:"coverage_se"`
	SalesRep      salesrep.Summary  `bson:"sales_rep"`
	CreatedBy     optionsdto.Option `bson:"created_by"`
	CreatedAt     time.Time         `bson:"created_at"`
	UpdatedAt     time.Time         `bson:"updated_at"`
}
