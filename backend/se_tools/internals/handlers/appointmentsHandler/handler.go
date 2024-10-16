package appointmentsHandler

import (
	"context"
	"net/http"
	"se_tools/internals/services"
	"se_tools/utils"
	"time"
)

type Handler struct {
	mux      *http.ServeMux
	services *services.Services
	utils    *utils.Utilities
}

func New(mux *http.ServeMux, services *services.Services, utils *utils.Utilities) *Handler {
	return &Handler{
		mux:      mux,
		services: services,
		utils:    utils,
	}
}

func (h *Handler) RegisterHandlers(w http.ResponseWriter, r *http.Request) {

	h.mux.Handle("/api/v1/appointments", http.HandlerFunc(h.AppointmentHandlers))

}

func (h *Handler) AppointmentHandlers(w http.ResponseWriter, r *http.Request) {

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	switch r.Method {
	case http.MethodGet:
		h.getAppointmentHandlers(ctx, w, r)
	case http.MethodPost:
		//Todo post functions for new appointments

	}
}
