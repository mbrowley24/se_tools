package company

import (
	"time"
)

type Summary struct {
	ID            string    `json:"id"`
	Name          string    `json:"name"`
	Industry      string    `json:"industry"`
	SalesEngineer string    `json:"sales_engineer"`
	CoverageSe    []string  `json:"coverage_se"`
	SalesRep      string    `json:"sales_rep"`
	CreatedBy     string    `json:"created_by"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}
