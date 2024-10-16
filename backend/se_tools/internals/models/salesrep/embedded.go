package salesrep

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"se_tools/internals/models/salesroles"
)

type Embedded struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	PublicId  string             `bson:"public_id"`
	FirstName string             `bson:"first_name"`
	LastName  string             `bson:"last_name"`
	Email     string             `bson:"email"`
	Role      salesroles.Model   `bson:"role"`
	Quota     float64            `bson:"quota"`
}

func (e *Embedded) ToSummary() Summary {

	return Summary{
		Id:        e.PublicId,
		FirstName: e.FirstName,
		LastName:  e.LastName,
		Email:     e.Email,
		Quota:     e.Quota,
		Role:      e.Role.Name,
	}
}
