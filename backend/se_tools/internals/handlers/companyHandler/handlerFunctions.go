package companyhandler

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"se_tools/internals/models/company"
	"se_tools/internals/models/industry"
	optionsdto "se_tools/internals/models/optionsDto"
	"se_tools/internals/models/salesroles"
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
	} else {
		if err := results.All(ctx, &companies); err != nil {
			if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
				return
			}
		}
	}

}

func (h *Handler) companyFormData(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	var salesRepModels []salesroles.Model
	var salesRepOptions []optionsdto.Option
	var industryModels []industry.Model
	var industryOptions []optionsdto.Option

	salesRepOpts := options.Find().SetSort(bson.D{{Key: "first_name", Value: 1}, {Key: "last_name", Value: 1}})
	salesRepResults, err := h.services.SalesRepService.FindSalesReps(ctx, bson.M{}, salesRepOpts)

	if err != nil {
		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	} else {

		if err := salesRepResults.All(ctx, &salesRepModels); err != nil {
			if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
				return
			}
		}
	}

	industryOpts := options.Find().SetSort(bson.M{"name": 1})
	industryResults, err := h.services.IndustryService.FindIndustries(ctx, bson.M{}, industryOpts)

	if err != nil {
		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}

	} else {

		if err := industryResults.All(ctx, &industryModels); err != nil {
			if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
				return
			}
		}
	}

	for _, model := range salesRepModels {

		salesRepOptions = append(salesRepOptions, model.ModelToOption())
	}

	for _, model := range industryModels {

		industryOptions = append(industryOptions, model.ToOption())
	}

	dataMap := make(map[string]interface{})

	dataMap["sales_reps"] = salesRepOptions
	dataMap["industries"] = industryOptions

	if err := h.utils.WriteJSON(w, http.StatusOK, dataMap, "form_data"); err != nil {
		return
	}

}
