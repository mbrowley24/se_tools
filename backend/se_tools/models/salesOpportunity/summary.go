package salesopportunity

import (
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
	// Company is the company associated with the sales opportunity
	Company string `json:"company"`
	// SalesRep is the sales representative assigned to the sales opportunity
	SalesRep string `json:"sales_rep"`
	//sales engineer is the sales engineer assigned to the sales opportunity
	SalesEngineer string `json:"sales_engineer"`
	// UpdatedAt is the date and time the sales opportunity was last updated
	UpdatedAt time.Time `json:"updated_at"`
}
