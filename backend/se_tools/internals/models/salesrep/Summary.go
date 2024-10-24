package salesrep

import (
	"time"
)

type Summary struct {
	Id            string    `json:"id,omitempty"`
	FirstName     string    `json:"first_name,omitempty"`
	LastName      string    `json:"last_name,omitempty"`
	Email         string    `json:"email,omitempty"`
	Phone         string    `json:"phone,omitempty"`
	SalesEngineer string    `json:"sales_engineer,omitempty"`
	Role          string    `json:"role,omitempty"`
	Quota         int64     `json:"quota,omitempty"`
	UpdateAt      time.Time `json:"updated_at,omitempty"`
}
