package salesopportunityhandlers

import (
	"net/http"
	"se_tools/repository"
	salesrepservice "se_tools/services/salesRepService"
	"se_tools/services/salesopportunityservice"
	userservice "se_tools/services/userService"
	"se_tools/utils"
)

type Handler struct {
	db              repository.DbRepository
	salesOppService salesopportunityservice.Service
	salesRepService salesrepservice.Service
	userservice     userservice.UserService
	utils           utils.Utilities
}

func (h *Handler) GetOpportunities(w http.ResponseWriter, r *http.Request) {
	switch r.Method {

	case http.MethodGet:
		//Todo get opportunities

	case http.MethodPost:
		//Todo save opportunity

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
