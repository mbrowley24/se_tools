package salesrep

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/roles"
	"time"
)

type DTO struct {
	ID            primitive.ObjectID `bson:"_id,omitempty"`
	PublicId      string             `bson:"public_id"`
	FirstName     string             `bson:"first_name"`
	LastName      string             `bson:"last_name"`
	Email         string             `bson:"email"`
	Phone         string             `bson:"phone"`
	SalesEngineer appUser.User       `bson:"sales_engineer"`
	CoverageSE    []appUser.User     `bson:"coverage_se"`
	Role          roles.Role         `bson:"role"`
	Quota         int64              `bson:"quota"`
	Version       int                `bson:"v"`
	CreatedAt     time.Time          `bson:"created_at"`
	UpdateAt      time.Time          `bson:"updated_at"`
}

func (d *DTO) DTOToSummary() Summary {
	return Summary{
		Id:            d.PublicId,
		FirstName:     d.FirstName,
		LastName:      d.LastName,
		Email:         d.Email,
		Phone:         d.Phone,
		SalesEngineer: fmt.Sprintf("%s %s", d.SalesEngineer.FirstName, d.SalesEngineer.LastName),
		Role:          d.Role.Name,
		Quota:         d.Quota,
		UpdateAt:      d.UpdateAt,
	}
}
