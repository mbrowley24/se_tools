package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"se_tools/internals"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func main() {

	//get context
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
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

	//Start applications
	app := internals.Internals{}

	app.ApplicationSetup(client)

	//get port for server
	port := os.Getenv("PORT")

	//check for error
	if len(port) == 0 {

		port = "8080"
	}

	//get server routes
	srv := &http.Server{
		Addr:         fmt.Sprintf(":%s", port),
		Handler:      app.Handler,
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
