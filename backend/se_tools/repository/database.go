package repository

import (
	"os"
	"se_tools/utils"

	"go.mongodb.org/mongo-driver/mongo/options"
)

type DbRepository struct {
	utils utils.Utilities
}

func (d *DbRepository) MongoOptions() *options.ClientOptions {
	// connect to the MongoDB database

	dbUri := os.Getenv("DB_URI")

	return options.Client().ApplyURI(dbUri)
}
