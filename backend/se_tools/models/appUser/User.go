package appUser

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID            primitive.ObjectID   `bson:"_id" json:"id"`
	Username      string               `bson:"username" json:"username"`
	FirstName     string               `bson:"firstname" json:"firstname"`
	LastName      string               `bson:"lastname" json:"lastname"`
	Email         string               `bson:"email" json:"email"`
	PublicId      string               `bson:"public_id" json:"public_id"`
	ResetPassword bool                 `bson:"resetpassword" json:"resetpassword"`
	Active        bool                 `bson:"active" json:"active"`
	Locked        bool                 `bson:"locked" json:"locked"`
	LoginAttempts int                  `bson:"loginattempts" json:"loginattempts"`
	Roles         []primitive.ObjectID `bson:"roles" json:"roles"`
	Password      string               `bson:"password" json:"password"`
	Token         string               `bson:"token" json:"token"`
	CsrfToken     string               `bson:"csrftoken" json:"csrftoken"`
	LastSeen      time.Time            `bson:"lastseen" json:"lastseen"`
	LastLogin     time.Time            `bson:"lastlogin" json:"lastlogin"`
	CreatedAt     time.Time            `bson:"created_at" json:"created_at"`
	UpdatedAt     time.Time            `bson:"updated_at" json:"updated_at"`
}
