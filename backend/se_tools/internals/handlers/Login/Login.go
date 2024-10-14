package login

import (
	"context"
	"net/http"
	"se_tools/internals/services"
	"time"
)

type Login struct {
	mux      *http.ServeMux
	services *services.Services
}

func New(mux *http.ServeMux, services *services.Services) *Login {

	return &Login{
		mux:      mux,
		services: services,
	}
}

func (l *Login) RegisterHandlers() {

	l.mux.Handle("/api/v1/login", http.HandlerFunc(l.login))
}

func (l *Login) loginHandler(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case http.MethodPost:
		l.login(w, r)

	case http.MethodOptions:
		println("OPTIONS login")

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.WriteHeader(http.StatusOK)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}

}

func (l *Login) login(w http.ResponseWriter, r *http.Request) {

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	switch r.Method {
	case http.MethodPost:

		l.PostLoginHandler(ctx, w, r)

	case http.MethodOptions:
		println("OPTIONS login")

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "POST")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.WriteHeader(http.StatusOK)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}

}
