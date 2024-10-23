package appointment

import (
	"time"
)

type Form struct {
	ID          string    `json:"_id,omitempty"`
	Type        string    `bson:"type"`
	Company     string    `bson:"company"`
	Description string    `bson:"description"`
	Date        string    `bson:"date"`
	Time        string    `bson:"time"`
	Products    []string  `bson:"products"`
	Notes       string    `bson:"notes"`
	InPerson    bool      `bson:"in_person"`
	Offset      string    `bson:"offset"`
	CreatedAt   time.Time `bson:"created_at"`
	UpdatedAt   time.Time `bson:"updated_at"`
}
