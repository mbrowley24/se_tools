package companyhandler

import (
	"context"
	"net/http"
	"se_tools/internals/services"
	"time"
)

type Handler struct {
	mux      *http.ServeMux
	services *services.Services
}

func New(services *services.Services, mux *http.ServeMux) *Handler {
	return &Handler{
		services: services,
		mux:      mux,
	}
}

func (h *Handler) RegisterHandler() {

	h.mux.Handle("/api/v1/companies", http.HandlerFunc(h.getCompaniesHandler))
}

func (h *Handler) getCompaniesHandler(w http.ResponseWriter, r *http.Request) {

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	switch r.Method {
	case http.MethodGet:
		h.getCompanies(ctx, w, r)
	case http.MethodPost:
		//Todo save company

	case http.MethodOptions:
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET,POST")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.WriteHeader(http.StatusOK)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}
