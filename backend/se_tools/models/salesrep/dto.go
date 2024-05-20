package salesrep

type DTO struct {
	ID            string  `json:"id"`
	Name          string  `json:"name"`
	Email         string  `json:"email"`
	Phone         string  `json:"phone"`
	Role          string  `json:"role"`
	SalesEngineer string  `json:"sales_engineer"`
	Quota         float64 `json:"quota"`
}
