package salesrolehandlers

import (
	"context"
	"net/http"
	"se_tools/internals/middleware"
	"se_tools/internals/services"
	"se_tools/utils"
	"time"
)

type Handler struct {
	middleware *middleware.Middleware
	mux        *http.ServeMux
	service    *services.Services
	utils      *utils.Utilities
}

func New(middleware *middleware.Middleware, mux *http.ServeMux, service *services.Services, utils *utils.Utilities) *Handler {
	return &Handler{
		middleware: middleware,
		mux:        mux,
		service:    service,
		utils:      utils,
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
