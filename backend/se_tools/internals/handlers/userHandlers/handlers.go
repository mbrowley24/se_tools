package userHandlers

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

func Start(middleware *middleware.Middleware, mux *http.ServeMux, service *services.Services, utils *utils.Utilities) *Handler {

	return &Handler{
		middleware: middleware,
		mux:        mux,
		services:   service,
		utils:      utils,
	}
}

func (h *Handler) RegisterHandlers() {

	h.mux.Handle("/api/v1/csrf_token", h.middleware.CheckToken(h.csrfToken))
}

func (h *Handler) csrfToken(w http.ResponseWriter, r *http.Request) {

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	switch r.Method {
	case http.MethodGet:
		h.getCSRFToken(ctx, w, r)
	}
}
