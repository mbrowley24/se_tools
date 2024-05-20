package salesmonth

import (
	"math/big"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SalesMonth struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`
	// PublicId is the public identifier of the sales month
	PublicId string `bson:"public_id"`
	// Name is the name of the sales month
	Month time.Month `bson:"name"`
	// Year is the year of the sales month
	Year int `bson:"year"`
	// Quota is the sales quota for the sales month
	Quota big.Float `bson:"quota"`
	//Sales Engineeer is the sales engineer assigned to the sales month
	SalesEngineer primitive.ObjectID `bson:"sales_engineer"`
	//SalesRep is the sales representative assigned to the sales month
	SalesRep primitive.ObjectID `bson:"sales_rep"`
	// Amount is the amount of the sales month
	Sales big.Float `bson:"sales"`
	// StartDate is the start date of the sales month
	StartDate time.Time `bson:"start_date"`
	// EndDate is the end date of the sales month
	EndDate time.Time `bson:"end_date"`
	// CreatedAt is the date and time the sales month was created
	CreatedAt time.Time `bson:"created_at"`
	// UpdatedAt is the date and time the sales month was last updated
	UpdatedAt time.Time `bson:"updated_at"`
}
