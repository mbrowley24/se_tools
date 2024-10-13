package companyhandler

import (
	"net/http"
	"se_tools/internals/repository"
	"se_tools/internals/services/companyService"
	"se_tools/internals/services/salesopportunityservice"
	"se_tools/internals/services/userService"
	"se_tools/utils"
)

type Handler struct {
	companyService     companyservice.Service
	db                 repository.DbRepository
	loginService       userservice.UserService
	opportunityService salesopportunityservice.Service
	utils              utils.Utilities
}

func (h *Handler) GetCompanies(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case http.MethodGet:
		//Todo get companies

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
