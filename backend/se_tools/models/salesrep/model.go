package salesrep

import (
	"se_tools/models/appUser"
	"se_tools/models/salesroles"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	ID            primitive.ObjectID `bson:"_id,omitempty"`
	PublicId      string             `bson:"public_id"`
	FirstName     string             `bson:"first_name"`
	LastName      string             `bson:"last_name"`
	Email         string             `bson:"email"`
	Phone         string             `bson:"phone"`
	SalesEngineer appUser.Embeded    `bson:"sales_engineer"`
	Role          salesroles.Embeded `bson:"role"`
	Quota         float64            `bson:"quota"`
	CreatedAt     time.Time          `bson:"created_at"`
	UpdateAt      time.Time          `bson:"updated_at"`
}
