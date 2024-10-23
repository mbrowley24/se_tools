package company

import (
	optionsdto "se_tools/internals/models/optionsDto"
	"time"
)

type Summary struct {
	ID            string              `json:"id"`
	Name          string              `json:"name"`
	Industry      optionsdto.Option   `json:"industry"`
	SalesEngineer optionsdto.Option   `json:"sales_engineer"`
	CoverageSe    []optionsdto.Option `json:"coverage_se"`
	SalesRep      optionsdto.Option   `json:"sales_rep"`
	CreatedBy     optionsdto.Option   `json:"created_by"`
	CreatedAt     time.Time           `json:"created_at"`
	UpdatedAt     time.Time           `json:"updated_at"`
}
