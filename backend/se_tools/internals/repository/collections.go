package repository

type Collection struct {
}

func (c *Collection) Authorities() string {
	return "authorities"
}

func (c *Collection) Companies() string {
	return "companies"
}

func (c *Collection) Industry() string {
	return "industry"
}

// func (c *Collection) Questions() string {
// 	return "questions"
// }

func (c *Collection) Roles() string {
	return "roles"
}

func (c *Collection) SalesReps() string {
	return "sales_reps"
}

func (c *Collection) SalesOpportunities() string {
	return "sales_opportunities"
}

func (c *Collection) SalesOpportunitiesStatus() string {
	return "sales_opportunities_status"
}

func (c *Collection) SalesProducts() string {
	return "sales_products"
}

func (c *Collection) SalesRoles() string {
	return "sales_roles"
}

func (c *Collection) Users() string {

	return "users"
}
