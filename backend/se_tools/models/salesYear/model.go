package salesyear

import (
	"math/big"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SalesYear struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`
	// PublicId is the public identifier of the sales year
	PublicId string `bson:"public_id"`
	// Year is the year of the sales year
	Year int `bson:"year"`
	// Quota is the sales quota for the sales year
	Quota big.Float `bson:"quota"`
	//Sales Engineeer is the sales engineer assigned to the sales year
	SalesEngineer primitive.ObjectID `bson:"sales_engineer"`
	//SalesRep is the sales representative assigned to the sales year
	SalesRep primitive.ObjectID `bson:"sales_rep"`
	// Amount is the amount of the sales year
	Sales big.Float `bson:"sales"`
	// StartDate is the start date of the sales year
	StartDate time.Time `bson:"start_date"`
	// EndDate is the end date of the sales year
	EndDate time.Time `bson:"end_date"`
	// CreatedAt is the date and time the sales year was created
	CreatedAt time.Time `bson:"created_at"`
	// UpdatedAt is the date and time the sales year was last updated
	UpdatedAt time.Time `bson:"updated_at"`
}
