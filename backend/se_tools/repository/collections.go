package repository

type Collection struct {
}

func (c *Collection) Authorities() string {
	return "authorities"
}

func (c *Collection) Roles() string {
	return "roles"
}

func (c *Collection) Users() string {

	return "users"
}
