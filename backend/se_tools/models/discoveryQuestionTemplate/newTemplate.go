package discoveryquestiontemplate

import "go.mongodb.org/mongo-driver/bson/primitive"

type NewDiscoveryTemplate struct {
	Name   string             `json:"name,omitempty" bson:"name,omitempty"`
	Author primitive.ObjectID `json:"author,omitempty" bson:"author,omitempty"`
}
