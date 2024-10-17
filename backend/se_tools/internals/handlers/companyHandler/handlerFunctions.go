package companyhandler

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"se_tools/internals/models/company"
	"strconv"
)

func (h *Handler) getCompanies(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	pageParam := r.URL.Query().Get("page")
	limitParam := r.URL.Query().Get("limit")

	page, err := strconv.Atoi(pageParam)

	if err != nil {
		page = 0
	}

	limit, err := strconv.Atoi(limitParam)

	if err != nil {
		limit = 10
	}

	var companies []company.Model

	opts := options.Find().SetLimit(int64(limit)).SetSkip(int64(page * limit)).SetSort(bson.M{"name": 1})

	results, err := h.services.CompanyService.FindCompanies(ctx, bson.M{}, opts)

	if err != nil {
		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	if err := results.All(ctx, &companies); err != nil {
		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}
}
