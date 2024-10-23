package appointment

import (
	optionsdto "se_tools/internals/models/optionsDto"
	"time"
)

type Summary struct {
	ID            string              `json:"id"`
	Type          optionsdto.Option   `json:"type"`
	Company       optionsdto.Option   `json:"company"`
	SalesRep      optionsdto.Option   `json:"sales_rep"`
	Date          time.Time           `json:"date"`
	SalesEngineer optionsdto.Option   `json:"sales_engineer"`
	Product       int                 `json:"product"`
	Products      []optionsdto.Option `json:"products"`
	UpdatedAt     time.Time           `json:"updated_at"`
}
