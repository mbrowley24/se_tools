package company

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/industry"
)

type Embedded struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	PublicId  string             `bson:"public_id"`
	Name      string             `bson:"name"`
	Industry  industry.Model     `bson:"industry"`
	CreatedBy appUser.Embedded   `bson:"created_by"`
}
