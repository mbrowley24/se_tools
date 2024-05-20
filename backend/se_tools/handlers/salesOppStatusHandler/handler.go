package salesoppstatushandler

import (
	"context"
	"net/http"
	"se_tools/repository"
	"se_tools/services/salesopportunitystatusservice"
	userservice "se_tools/services/userService"
	"se_tools/utils"
	"time"
)

type Handler struct {
	db          repository.DbRepository
	service     salesopportunitystatusservice.Service
	userService userservice.UserService
	utils       utils.Utilities
}

func (h *Handler) GetStatusOptions(w http.ResponseWriter, r *http.Request) {

	//get context
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	_, err := h.userService.ValidateTokenAndGetClaims(r)

	if err != nil {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	//get database and check for errors
	db, err := h.db.Database(ctx)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//get status options

	options, err := h.service.OpportunityStatusOptions(ctx, db)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = h.utils.WriteJSON(w, http.StatusOK, options, "data")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
