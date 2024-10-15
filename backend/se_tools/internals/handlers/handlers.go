package handlers

import (
	"net/http"
	"se_tools/internals/services"
)

type Handlers struct {
	Mux      *http.ServeMux
	Services *services.Services
}

func (h *Handlers) RegisterHandlers() {

}
