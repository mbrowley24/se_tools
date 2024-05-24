package salesmeeting

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SalesMeeting struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`
	// PublicId is the public identifier of the sales meeting
	PublicId string `bson:"public_id"`
	// Name is the name of the sales meeting
	Name string `bson:"name"`
	// Description is the description of the sales meeting
	Description string `bson:"description"`
	// Date is the date of the sales meeting
	Date time.Time `bson:"date"`
	// InPerson is a boolean indicating if the sales meeting is in person
	InPerson bool `bson:"in_person"`
	// SalesOpportunity is the sales opportunity associated with the sales meeting
	SalesOpportunity primitive.ObjectID `bson:"sales_opportunity_id"`
	// Description is the description of the sales meeting
	Offset time.Location `bson:"offset"`
	// CreatedAt is the time the sales meeting was created
	CreatedAt time.Time `bson:"created_at"`
	// UpdatedAt is the time the sales meeting was last updated
	UpdatedAt time.Time `bson:"updated_at"`
}
