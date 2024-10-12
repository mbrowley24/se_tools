package salesrolehandlers

import (
	"net/http"
	"se_tools/repository"
	"se_tools/services/salesroleservice"
	"se_tools/utils"
)

type Handler struct {
	DB               repository.DbRepository
	SalesRoleService salesroleservice.Service
	util             utils.Utilities
}

func (h *Handler) SalesRoles(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case http.MethodGet:
		//Todo get sales role options

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
