package salesrolehandlers

import (
	"context"
	"net/http"
	"se_tools/internals/services"
	"time"
)

type Handler struct {
	mux     *http.ServeMux
	service *services.Services
}

func New(mux *http.ServeMux, service *services.Services) *Handler {
	return &Handler{
		mux:     mux,
		service: service,
	}
}

func (h *Handler) RegisterHandlers() {

	h.mux.Handle("/api/v1/sales_roles", http.HandlerFunc(h.salesRoles))
}

func (h *Handler) salesRoles(w http.ResponseWriter, r *http.Request) {

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	switch r.Method {
	case http.MethodGet:
		h.getSalesRoles(ctx, w, r)
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
