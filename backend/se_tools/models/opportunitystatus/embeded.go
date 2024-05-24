package opportunitystatus

import "go.mongodb.org/mongo-driver/bson/primitive"

type Embeded struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`
	// PublicId is the public identifier of the sales opportunity
	PublicId string `bson:"public_id"`
	// Name is the name of the sales opportunity
	Name string `bson:"name"`
	// Description is the description of the sales opportunity
	Description string `bson:"description"`
	// UpdatedAt is the date and time the sales opportunity was last updated
	UpdatedAt primitive.DateTime `bson:"updated_at"`
}
