package industryHandler

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

func (h *Handler) RegisterHandlers() {

	h.mux.Handle("/api/v1/industries", h.middleware.CheckToken(h.industries))
}

func (h *Handler) industries(w http.ResponseWriter, r *http.Request) {

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	switch r.Method {

	case http.MethodGet:
		h.getIndustries(ctx, w, r)
	}
}
