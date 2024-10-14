package appUser

import (
	"se_tools/internals/models/roles"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Username      string             `bson:"username" json:"username"`
	FirstName     string             `bson:"first_name" json:"firstname"`
	LastName      string             `bson:"last_name" json:"lastname"`
	Email         string             `bson:"email" json:"email"`
	PublicId      string             `bson:"public_id" json:"public_id"`
	ResetPassword bool               `bson:"reset_password" json:"reset_password"`
	Active        bool               `bson:"active" json:"active"`
	Locked        bool               `bson:"locked" json:"locked"`
	LoginAttempts int                `bson:"login_attempts" json:"login_attempts"`
	Roles         []roles.Role       `bson:"roles" json:"roles"`
	Password      string             `bson:"password" json:"password"`
	OAuth         string             `bson:"oAuth" json:"oAuth"`
	Token         string             `bson:"token" json:"token"`
	CsrfToken     string             `bson:"csrf_token" json:"csrf_token"`
	LastSeen      time.Time          `bson:"last_seen" json:"last_seen"`
	LastLogin     time.Time          `bson:"last_login" json:"last_login"`
	CreatedAt     time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt     time.Time          `bson:"updated_at" json:"updated_at"`
}

func (u *User) Embedded() Embedded {
	return Embedded{
		Id:        u.ID,
		PublicId:  u.PublicId,
		FirstName: u.FirstName,
		LastName:  u.LastName,
		Email:     u.Email,
		Username:  u.Username,
	}
}
