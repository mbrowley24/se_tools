package company

import (
	"se_tools/models/appUser"
	"se_tools/models/industry"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`
	// PublicId is the public id of the account
	PublicId string `bson:"public_id"`
	// Name is the name of the account
	Name string `bson:"name"`
	//sales engineer is the sales engineer assigned to the sales opportunity
	SalesEngineer appUser.Embeded `bson:"sales_engineer"`
	//industry or vertical
	Industry industry.Model `bson:"industry"`
	//created by is the user who created the account
	CreatedAt time.Time `bson:"created_at"`
	// UpdatedAt is the date and time the account was last updated
	UpdatedAt time.Time `bson:"updated_at"`
}
