package appointment

import "time"

type Summary struct {
	ID            string    `json:"id"`
	Name          string    `json:"name"`
	Type          string    `json:"type"`
	Company       string    `json:"company"`
	SalesRep      string    `json:"sales_rep"`
	Date          time.Time `json:"date"`
	SalesEngineer string    `json:"sales_engineer"`
	Product       int       `json:"product"`
	Products      []string  `json:"products"`
	UpdatedAt     time.Time `json:"updated_at"`
}
