package appUser

import "go.mongodb.org/mongo-driver/bson/primitive"

type AdminUser struct {
	FirstName string               `json:"first_name"`
	LastName  string               `json:"last_name"`
	Email     string               `json:"email"`
	Roles     []primitive.ObjectID `json:"roles"`
	Username  string               `json:"username"`
	Password  string               `json:"password"`
}
