package internals

import (
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"se_tools/internals/handlers"
	"se_tools/internals/repository"
)

type Internals struct {
	Handler http.Handler
}

func (i *Internals) enableCors(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		//preflight checks
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func (i *Internals) ApplicationSetup(client *mongo.Client) {

	//route multiplexer
	mux := http.NewServeMux()
	//Repository for appointments
	appointmentRepo := repository.AppointmentRepository{
		Client:   client,
		Database: client.Database("appointments"),
	}

	registerHandlers := handlers.Handlers{
		Repository: &appointmentRepo,
		Mux:        mux,
	}

	registerHandlers.RegisterHandlers()

	//Cors enable on mux
	i.Handler = i.enableCors(mux)
}
