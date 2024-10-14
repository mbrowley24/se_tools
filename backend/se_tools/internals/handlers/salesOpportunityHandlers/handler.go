package salesopportunityhandlers

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

func New(mux *http.ServeMux, services *services.Services) *Handler {

	return &Handler{
		mux:      mux,
		services: services,
	}
}

func (h *Handler) RegisterHandlers() {

	h.mux.Handle("/api/v1/opportunity", http.HandlerFunc(h.getOpportunitiesHandler))
}

func (h *Handler) getOpportunitiesHandler(w http.ResponseWriter, r *http.Request) {

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	switch r.Method {

	case http.MethodGet:
		h.getOpportunities(ctx, w, r)

	case http.MethodPost:
		//Todo save opportunity

	case http.MethodOptions:
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.WriteHeader(http.StatusOK)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)

	}
}
