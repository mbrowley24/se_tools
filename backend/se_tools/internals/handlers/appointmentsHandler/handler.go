package appointmentsHandler

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

	h.mux.Handle("/api/v1/appointments", h.middleware.CheckToken(h.appointmentHandlers))
	h.mux.Handle("/api/v1/appointments/new", h.middleware.CheckToken(h.newAppointments))
}

func (h *Handler) appointmentHandlers(w http.ResponseWriter, r *http.Request) {

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	switch r.Method {
	case http.MethodGet:
		h.getAppointmentHandlers(ctx, w, r)
	case http.MethodPost:
		//Todo post functions for new appointments

	}
}

func (h *Handler) newAppointments(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	switch r.Method {
	case http.MethodGet:
		h.getNewAppointmentHandler(ctx, w, r)
	case http.MethodPost:
	}
}
