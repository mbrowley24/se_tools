package timezoneService

import (
	"go.mongodb.org/mongo-driver/mongo"
	"se_tools/utils"
)

type TimeZoneService struct {
	collection *mongo.Collection
	utils      *utils.Utilities
}
