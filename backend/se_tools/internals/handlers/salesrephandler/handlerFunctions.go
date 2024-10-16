package salesrephandler

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"se_tools/internals/models/salesrep"
	"strconv"
)

// GetSalesReps get a list of sales reps but Users id
func (h *Handler) getSalesReps(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	limitParam := r.URL.Query().Get("limit")
	pageParam := r.URL.Query().Get("page")

	limit, err := strconv.Atoi(limitParam)

	if err != nil {
		limit = 10
	}

	page, err := strconv.Atoi(pageParam)

	if err != nil {
		page = 0
	}

	var salesReps []salesrep.Model
	var salesRepDTO []salesrep.Summary

	//get data from context in the form of a map
	contextMap := ctx.Value("params").(map[string]interface{})

	userId := contextMap["user_id"].(string)

	userObjectId, err := primitive.ObjectIDFromHex(userId)

	if err != nil {

		if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	//Query filter for sales reps that are assigned to the SE or match on of the SE that are covering sales rep
	filter := bson.M{"$or": []bson.M{
		{"sales_engineer": userObjectId},
		{"coverage_se": bson.M{
			"$elemMatch": bson.M{
				"$eq": userObjectId,
			},
		}},
	}}

	opts := options.Find().SetLimit(int64(limit)).SetSkip(int64(page))

	result, err := h.services.SalesRepService.FindSalesReps(ctx, filter, opts)

	if err != nil {
		if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	//decode sales reh. Place sales reps in a DTO before sending to front-end
	if err = result.Decode(salesReps); err != nil {

		if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	//convert sales reps to DTO for front-end use
	for _, salesRep := range salesReps {

		salesRepDTO = append(salesRepDTO, salesRep.ModelToSummary())
	}

	//return data to user. The data at this point should be converted to DTO to remove sensitive data and primary key
	//info from the database
	if err = h.utils.WriteJSON(w, http.StatusOK, salesRepDTO, ""); err != nil {
		return
	}
}
