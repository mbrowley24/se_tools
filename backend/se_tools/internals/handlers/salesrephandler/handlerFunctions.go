package salesrephandler

import (
	"context"
	"net/http"
)

// GetSalesReps get a list of sales reps but Users id
func (h *Handler) getSalesReps(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	////Get claims from token and check for error. The userId is needed from claims to ensure user queries their own
	////sales reps or reps they are covering for
	//claims, err := h.userService.ValidateTokenAndGetClaims(r)
	//
	//if err != nil {
	//	//ToDo handle error
	//
	//	if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
	//		return
	//	}
	//}
	//
	////sales rep array to hold find query results for sales reps
	//var salesReps []salesrep.Model
	//var salesRepDTO []salesrep.DTO
	//
	////Get the user ID as a hex value and convert to ObjectId
	//userId := claims.Subject
	//
	//userObjectId, err := primitive.ObjectIDFromHex(userId)
	//
	//if err != nil {
	//
	//	if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
	//		return
	//	}
	//}
	//
	////Query filter for sales reps that are assigned to the SE or match on of the SE that are covering sales rep
	//filter := bson.M{"$or": []bson.M{
	//	{"sales_engineer": userObjectId},
	//	{"coverage_se": bson.M{
	//		"$elemMatch": bson.M{
	//			"$eq": userObjectId,
	//		},
	//	}},
	//}}
	//
	//result, err := h.Collection.Find(ctx, filter)
	//
	//if err != nil {
	//	if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
	//		return
	//	}
	//}
	//
	////decode sales reh. Place sales reps in a DTO before sending to front-end
	//if err = result.Decode(salesReps); err != nil {
	//
	//	if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
	//		return
	//	}
	//}
	//
	////convert sales reps to DTO for front-end use
	//for _, salesRep := range salesReps {
	//
	//	salesRepDTO = append(salesRepDTO, salesRep.ModelToDTO())
	//}
	//
	////return data to user. The data at this point should be converted to DTO to remove sensitive data and primary key
	////info from the database
	//if err = h.utilh.WriteJSON(w, http.StatusOK, salesRepDTO, ""); err != nil {
	//	return
	//}
}
