package repository

import (
	"context"
	"se_tools/utils"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DbRepository struct {
	utils utils.Utilities
}

func (d DbRepository) mongoDBClient(ctx context.Context) (*mongo.Client, error) {
	// connect to the MongoDB database
	db_uri, err := d.utils.Env("DB_URI")

	if err != nil {
		return nil, err
	}

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(db_uri))

	return client, err
}

func (d DbRepository) Database(ctx context.Context) (*mongo.Database, error) {
	// get the MongoDB database

	db_name, err := d.utils.Env("DB_NAME")

	if err != nil {
		return nil, err
	}

	dbClient, err := d.mongoDBClient(ctx)

	if err != nil {
		return nil, err
	}

	database := dbClient.Database(db_name)

	return database, nil
}
