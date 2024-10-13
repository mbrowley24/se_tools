package appUser

import (
	"se_tools/internals/models/roles"
)

type AdminUser struct {
	FirstName string       `json:"first_name"`
	LastName  string       `json:"last_name"`
	Email     string       `json:"email"`
	Roles     []roles.Role `json:"roles"`
	Username  string       `json:"username"`
	Password  string       `json:"password"`
}
