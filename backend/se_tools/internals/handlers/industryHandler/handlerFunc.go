package industryHandler

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"se_tools/internals/models/industry"
	optionsdto "se_tools/internals/models/optionsDto"
)

func (h *Handler) getIndustries(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	var industryModels []industry.Model
	opts := options.Find().SetSort(bson.M{"name": 1})

	results, err := h.services.IndustryService.FindIndustries(ctx, bson.M{}, opts)

	if err != nil {
		if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	if err = results.All(ctx, &industryModels); err != nil {
		if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	var optionData []optionsdto.Option

	for _, model := range industryModels {

		optionData = append(optionData, model.ToOption())
	}

	if err = h.utils.WriteJSON(w, http.StatusOK, optionData, "industries"); err != nil {
		return
	}
}
