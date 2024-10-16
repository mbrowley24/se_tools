package salesrep

import (
	"se_tools/internals/models/appUser"
	optionsdto "se_tools/internals/models/optionsDto"
	"time"
)

type DTO struct {
	Id            string            `json:"id"`
	FirstName     string            `json:"first_name"`
	LastName      string            `json:"last_name"`
	Email         string            `json:"email"`
	Phone         string            `json:"phone,omitempty"`
	SalesEngineer appUser.DTO       `json:"sales_engineer"`
	CoverageSE    []appUser.DTO     `json:"coverage_se"`
	Role          optionsdto.Option `json:"role"`
	Quota         float64           `json:"quota"`
	UpdateAt      time.Time         `json:"updated_at,omitempty"`
}
