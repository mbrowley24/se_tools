package salesrephandler

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"se_tools/internals/models/salesrep"
)

// GetSalesReps get a list of sales reps but Users id
func (h *Handler) getSalesReps(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	//Get claims from token and check for error. The userId is needed from claims to ensure user queries their own
	//sales reps or reps they are covering for

	//sales rep array to hold find query results for sales reps
	var salesReps []salesrep.Model
	var salesRepDTO []salesrep.DTO

	//Get the user ID as a hex value and convert to ObjectId

	contextMap := ctx.Value("params").(map[string]interface{})

	userId := contextMap["uer_id"].(string)

	userObjectId, err := primitive.ObjectIDFromHex(userId)

	if err != nil {

		if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	//Todo start here when you pick back up
	//Query filter for sales reps that are assigned to the SE or match on of the SE that are covering sales rep
	filter := bson.M{"$or": []bson.M{
		{"sales_engineer": userObjectId},
		{"coverage_se": bson.M{
			"$elemMatch": bson.M{
				"$eq": userObjectId,
			},
		}},
	}}

	result, err := h.services.SalesRepService

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

		salesRepDTO = append(salesRepDTO, salesRep.ModelToDTO())
	}

	//return data to user. The data at this point should be converted to DTO to remove sensitive data and primary key
	//info from the database
	if err = h.utilh.WriteJSON(w, http.StatusOK, salesRepDTO, ""); err != nil {
		return
	}
}
