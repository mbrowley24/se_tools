package categoryhandlers

import (
	"context"
	"net/http"
	"se_tools/repository"
	categoryservice "se_tools/services/categoryService"
	"se_tools/utils"
	"time"
)

type Handler struct {
	categoryservice categoryservice.Service
	db              repository.DbRepository
	utils           utils.Utilities
}

func (h *Handler) GetCategories(w http.ResponseWriter, r *http.Request) {

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	db, err := h.db.Database(ctx)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	options, err := h.categoryservice.GetCategories(ctx, db)

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
