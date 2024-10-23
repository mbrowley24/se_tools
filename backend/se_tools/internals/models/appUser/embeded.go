package appUser

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Embedded struct {
<<<<<<< HEAD
	Id       primitive.ObjectID `bson:"_id,omitempty"`
	PublicId string             `bson:"public_id"`
=======
	Id        primitive.ObjectID `bson:"_id,omitempty"`
	Username  string             `bson:"username" json:"username"`
	FirstName string             `bson:"first_name" json:"firstname"`
	LastName  string             `bson:"last_name" json:"lastname"`
	Email     string             `bson:"email" json:"email"`
	PublicId  string             `bson:"public_id" json:"public_id"`
}

func (e *Embedded) ModelToDTO() DTO {

	return DTO{
		Id:        e.PublicId,
		FirstName: e.FirstName,
		LastName:  e.LastName,
		Email:     e.Email,
	}
>>>>>>> main
}
