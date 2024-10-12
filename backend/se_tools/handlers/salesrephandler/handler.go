package salesrephandler

import (
	"net/http"
	"se_tools/repository"
	salesrepservice "se_tools/services/salesRepService"
	"se_tools/services/salesroleservice"
	userservice "se_tools/services/userService"
	"se_tools/utils"
)

type Handler struct {
	DB               repository.DbRepository
	SalesRepService  salesrepservice.Service
	SalesRoleService salesroleservice.Service
	loginService     userservice.UserService
	userservice      userservice.Service
	utils            utils.Utilities
}

func (h *Handler) SalesReps(w http.ResponseWriter, r *http.Request) {

	switch r.Method {

	case http.MethodGet:
		//Todo add get function here to get sales reps

	case http.MethodPost:
		//Todo add function to create new sales reps

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

func (h *Handler) OneSalesRep(w http.ResponseWriter, r *http.Request) {

	switch r.Method {

	case http.MethodGet:
		//Todo get one sales rep functions

	case http.MethodPut:
		//Todo update sales rep

	case http.MethodDelete:
		//Todo delete sales rep

	case http.MethodOptions:
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, DELETE, PUT")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.WriteHeader(http.StatusOK)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (h *Handler) SalesRepOptions(w http.ResponseWriter, r *http.Request) {

	switch r.Method {

	case http.MethodGet:
		//Todo place a get method that handles user options dto for selection
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

func (h *Handler) CheckEmail(w http.ResponseWriter, r *http.Request) {

	switch r.Method {

	case http.MethodGet:
		//Todo check email exists functions

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
