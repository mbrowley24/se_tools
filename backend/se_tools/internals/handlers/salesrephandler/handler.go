package salesrephandler

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
	services   *services.Services
	utils      *utils.Utilities
}

func New(middleware *middleware.Middleware, mux *http.ServeMux, services *services.Services, utils *utils.Utilities) *Handler {
	return &Handler{
		middleware: middleware,
		mux:        mux,
		services:   services,
		utils:      utils,
	}
}

func (h *Handler) RegisterHandler() {

	h.mux.Handle("/api/v1/sales_reps", h.middleware.CheckToken(h.salesReps))
}

func (h *Handler) salesReps(w http.ResponseWriter, r *http.Request) {

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	switch r.Method {

	case http.MethodGet:

		h.getSalesReps(ctx, w, r)

	case http.MethodPost:
		h.postSalesRep(ctx, w, r)

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

func (h *Handler) OneSalesRep(w http.ResponseWriter, r *http.Request) {

	switch r.Method {

	case http.MethodGet:
		//Todo get one sales rep functions

	case http.MethodPut:
		//Todo update sales rep

	case http.MethodDelete:
		//Todo delete sales rep

	case http.MethodOptions:
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, DELETE, PUT")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.WriteHeader(http.StatusOK)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (h *Handler) SalesRepOptions(w http.ResponseWriter, r *http.Request) {

	switch r.Method {

	case http.MethodGet:
		//Todo place a get method that handles user options dto for selection
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

func (h *Handler) CheckEmail(w http.ResponseWriter, r *http.Request) {

	switch r.Method {

	case http.MethodGet:
		//Todo check email exists functions

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
