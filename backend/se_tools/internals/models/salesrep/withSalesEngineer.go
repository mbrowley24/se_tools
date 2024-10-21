package salesrep

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/salesroles"
	"time"
)

type WithSalesEngineer struct {
	ID            primitive.ObjectID `bson:"_id,omitempty"`
	PublicId      string             `bson:"public_id"`
	FirstName     string             `bson:"first_name"`
	LastName      string             `bson:"last_name"`
	Email         string             `bson:"email"`
	Phone         string             `bson:"phone"`
	SalesEngineer appUser.User       `bson:"sales_engineer"`
	Role          salesroles.Model   `bson:"role"`
	Quota         int64              `bson:"quota"`
	CreatedAt     time.Time          `bson:"created_at"`
	UpdateAt      time.Time          `bson:"updated_at"`
}

func (w *WithSalesEngineer) ModelToSummary() Summary {

	return Summary{
		Id:            w.PublicId,
		FirstName:     w.FirstName,
		LastName:      w.LastName,
		Email:         w.Email,
		Phone:         w.Phone,
		SalesEngineer: fmt.Sprintf("%s %s", w.SalesEngineer.FirstName, w.SalesEngineer.LastName),
		Role:          w.Role.Name,
		Quota:         w.Quota,
		UpdateAt:      w.UpdateAt,
	}
}
