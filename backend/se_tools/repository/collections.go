package repository

type Collection struct {
}

func (c *Collection) Authorities() string {
	return "authorities"
}

func (c *Collection) Categories() string {
	return "categories"
}

func (c *Collection) DiscoveryQuestions() string {
	return "discovery_questions"
}

func (c *Collection) DiscoveryQuestionLikes() string {
	return "discovery_question_likes"
}

func (c *Collection) Industry() string {
	return "industry"
}

func (c *Collection) ISP() string {
	return "isp"
}

func (c *Collection) ISPServices() string {

	return "isp_services"
}

func (c *Collection) ISPServiceCategories() string {
	return "isp_service_categories"
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

func (c *Collection) SalesMonths() string {
	return "sales_months"
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

func (c *Collection) SalesYears() string {
	return "sales_years"
}

func (c *Collection) TemplateQuestion() string {
	return "discovery_question_templates"
}

func (c *Collection) TemplateQuestionOrder() string {
	return "discovery_question_order"
}

func (c *Collection) Users() string {

	return "users"
}
