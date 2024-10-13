package handlers

import (
	"net/http"
	login "se_tools/internals/handlers/Login"
	"se_tools/internals/repository"
)

type Handlers struct {
	Mux        *http.ServeMux
	Repository *repository.AppointmentRepository
}

func (h *Handlers) RegisterHandlers() {

	loginHandlers := login.Login{
		Repository: h.Repository,
	}

	loginHandlers.Handlers(h.Mux)
}
