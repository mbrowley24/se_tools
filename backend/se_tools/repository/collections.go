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

func (c *Collection) Users() string {

	return "users"
}
