package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"se_tools/routes"
	initservice "se_tools/services/initService"

	"se_tools/utils"

	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type applications struct {
	utils       utils.Utilities
	routes      routes.Routes
	initservice initservice.InitData
}

func main() {

	apps := &applications{}

	//Get db connection string
	if err := apps.utils.Env(); err != nil {
		//Todo handle error
	}

	//get context
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()

	//get db client
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(os.Getenv("DB_URI")))

	//check for error
	if err != nil {
		log.Fatal(err)
	}

	//defer disconnect
	defer func(client *mongo.Client, ctx context.Context) {

		err := client.Disconnect(ctx)

		if err != nil {
			log.Fatal(err)
		}

	}(client, ctx)

	//check connection by ping
	if err = client.Ping(ctx, readpref.Primary()); err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to MongoDB")

	//get port for server
	port := os.Getenv("PORT")

	//check for error
	if len(port) == 0 {

		port = "8080"
	}

	if err = apps.initservice.Init(ctx); err != nil {
		//Todo handle this error

		panic("data initiation error")
	}

	//get server routes
	srv := &http.Server{
		Addr:         fmt.Sprintf(":%s", port),
		Handler:      apps.routes.Routes(),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	//start server and check for error
	err = srv.ListenAndServe()

	if err != nil {
		println("Error starting server")
		println(err.Error())
		log.Fatal(err)
	}

}
