package timezoneservice

import (
	"bufio"
	"context"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"os"
	"se_tools/internals/models/timezones"
	"se_tools/utils"
	"strings"
	"time"
)

type TimeZoneService struct {
	collection *mongo.Collection
	utils      *utils.Utilities
}

func StartService(collection *mongo.Collection, utils *utils.Utilities) *TimeZoneService {
	return &TimeZoneService{collection, utils}
}

func (t *TimeZoneService) Initialize() error {

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	file, err := os.Open("./configFiles/timeLocations.txt")

	if err != nil {
		return err
	}

	defer func(file *os.File) {

		if err = file.Close(); err != nil {
			log.Fatal(err)
		}

	}(file)

	scanner := bufio.NewScanner(file)

	var tzones []interface{}

	for scanner.Scan() {
		line := scanner.Text()

		timeZone := strings.Split(line, ":")

		if len(timeZone) != 2 {

			return errors.New("time zone is invalid")
		}

		name := strings.TrimSpace(timeZone[0])
		description := strings.TrimSpace(timeZone[1])

		publicId := t.utils.RandomStringGenerator(30)

		for {

			filter := bson.M{"public_id": publicId}

			count, err := t.collection.CountDocuments(ctx, filter)

			if err != nil {
				return err
			}

			if count == 0 {

				break
			}

			publicId = t.utils.RandomStringGenerator(30)
		}

		now := time.Now()
		tZone := timezones.Model{
			ID:          primitive.NewObjectID(),
			PublicId:    publicId,
			Name:        name,
			Description: description,
			CreatedAt:   now,
			UpdatedAt:   now,
		}

		tzones = append(tzones, tZone)
	}

	if _, err := t.collection.InsertMany(ctx, tzones, nil); err != nil {
		return err
	}

	return nil
}
