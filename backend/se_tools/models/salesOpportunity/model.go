package salesopportunity

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`
	// PublicId is the public identifier of the sales opportunity
	PublicId string `bson:"public_id"`
	// Name is the name of the sales opportunity
	Name string `bson:"name"`
	// Amount is the amount of the sales opportunity
	Amount float64 `bson:"amount"`
	// CloseDate is the date the sales opportunity is expected to close
	CloseDate time.Time `bson:"close_date"`
	// Description is the description of the sales opportunity
	Description string `bson:"description"`
	// Company is the company associated with the sales opportunity
	Company primitive.ObjectID `bson:"company"`
	// Status is the status of the sales opportunity
	Status primitive.ObjectID `bson:"status"`
	// SalesRep is the sales representative assigned to the sales opportunity
	SalesRep primitive.ObjectID `bson:"sales_rep"`
	// SalesEngineer is the sales engineer assigned to the sales opportunity
	SalesEngineer primitive.ObjectID `bson:"sales_engineer"`
	// CreatedAt is the date and time the sales opportunity was created
	CreatedAt time.Time `bson:"created_at"`
	// UpdatedAt is the date and time the sales opportunity was last updated
	UpdatedAt time.Time `bson:"updated_at"`
}
