package industryhandler

import (
	"context"
	"net/http"
	"se_tools/repository"
	industryservice "se_tools/services/industryService"
	"se_tools/utils"
	"time"
)

type Handler struct {
	industryService industryservice.Service
	db              repository.DbRepository
	utils           utils.Utilities
}

func (h *Handler) GetIndustries(w http.ResponseWriter, r *http.Request) {

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	db, err := h.db.Database(ctx)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	options, err := h.industryService.GetIndustries(ctx, db)

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
