package salesopportunity

import (
	optionsdto "se_tools/models/optionsDto"
	"time"
)

// Sumary is a summary of a sales opportunity
type Sumary struct {
	ID string `json:"id"`
	// Name is the name of the sales opportunity
	Name string `json:"name"`
	// Amount is the amount of the sales opportunity
	Amount float64 `json:"amount"`
	// CloseDate is the date the sales opportunity is expected to close
	CloseDate time.Time `json:"close_date"`
	// Description is the description of the sales opportunity
	Description string `json:"description"`
	// Status is the status of the sales opportunity
	Status string `json:"status"`
	// SalesRep is the sales representative assigned to the sales opportunity
	SalesRep optionsdto.Option `json:"sales_rep"`
	//sales engineer is the sales engineer assigned to the sales opportunity
	SalesEngineer optionsdto.Option `json:"sales_engineer"`
	// UpdatedAt is the date and time the sales opportunity was last updated
	UpdatedAt time.Time `json:"updated_at"`
}
