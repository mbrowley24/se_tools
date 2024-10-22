package companyhandler

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

func New(middleware *middleware.Middleware, services *services.Services, mux *http.ServeMux, utils *utils.Utilities) *Handler {
	return &Handler{
		middleware: middleware,
		services:   services,
		mux:        mux,
		utils:      utils,
	}
}

func (h *Handler) RegisterHandler() {

	h.mux.Handle("/api/v1/companies", h.middleware.CheckToken(h.getCompaniesHandler))
	h.mux.Handle("/api/v1/companies/new", h.middleware.CheckToken(h.newCompanies))
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

func (h *Handler) newCompanies(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	switch r.Method {
	case http.MethodGet:
		h.companyFormData(ctx, w, r)

	case http.MethodPost:
		h.newCompany(ctx, w, r)
	}
}
