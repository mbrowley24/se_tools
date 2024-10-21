package salesrephandler

import (
	"context"
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/salesrep"
	"strconv"
	"strings"
	"time"
)

// GetSalesReps get a list of sales reps but Users id
func (h *Handler) getSalesReps(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	var salesReps []salesrep.Model
	var salesRepDTO []salesrep.Summary

	//get data from context in the form of a map
	contextMap := r.Context().Value(h.middleware.ContextKey).(map[string]string)

	userId := contextMap["user_id"]

	userObjectId, err := primitive.ObjectIDFromHex(userId)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//Query filter for sales reps that are assigned to the SE or match on of the SE that are covering sales rep
	filter := bson.M{"$or": []bson.M{
		{"sales_engineer.id": userObjectId},
		{"coverage_se": bson.M{
			"$elemMatch": bson.M{
				"$eq": userObjectId,
			},
		}},
	}}

	opts := options.Find().SetSort(bson.D{{Key: "first_name", Value: 1}, {Key: "last_name", Value: 1}})

	results, err := h.services.SalesRepService.FindSalesReps(ctx, filter, opts)

	if err != nil {

		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//decode sales reh. Place sales reps in a DTO before sending to front-end
	if err = results.All(ctx, &salesReps); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}

	salesEngineerName, ok := contextMap["user_name"]

	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	salesEngineerNameSlice := strings.Split(salesEngineerName, "/")

	//convert sales reps to DTO for front-end use
	for _, salesRep := range salesReps {

		salesRepDTO = append(salesRepDTO, salesRep.ModelToSummary(salesEngineerNameSlice[0], salesEngineerNameSlice[1]))
	}

	//return data to user. The data at this point should be converted to DTO to remove sensitive data and primary key
	//info from the database
	if err = h.utils.WriteJSON(w, http.StatusOK, salesRepDTO, ""); err != nil {
		return
	}
}

func (h *Handler) postSalesRep(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	var salesRepForm salesrep.Form
	var salesRepModel salesrep.Model
	var salesEngineer appUser.User

	//Get user data from context. Data is inserted into to context when the cookie and jwt are validated
	params, ok := ctx.Value("params").(map[string]interface{})

	if !ok {
		if err := h.utils.WriteJSON(w, http.StatusBadRequest, "", "error"); err != nil {
			return
		}
	}

	println(params["user_id"])

	userId, err := primitive.ObjectIDFromHex(params["user_id"].(string))

	if err != nil {
		if err = h.utils.WriteJSON(w, http.StatusBadRequest, "", "error"); err != nil {
			return
		}
	}

	//get login sales Engineer and assign to new sales rep
	userFilter := h.services.UserService.FilterId(userId)

	if err := h.services.UserService.FindUser(ctx, userFilter, nil).Decode(&salesEngineer); err != nil {

		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	salesRepModel.SalesEngineer = salesEngineer.Embedded()

	//pull from data from request sent from front-end
	if err := json.NewDecoder(r.Body).Decode(&salesRepForm); err != nil {

		if err = h.utils.WriteJSON(w, http.StatusBadRequest, "", "error"); err != nil {
			return
		}
	}

	//validate sales rep form data
	if err := salesRepForm.Validate(); err != nil {
		if err = h.utils.WriteJSON(w, http.StatusBadRequest, "", "error"); err != nil {
			return
		}

	} else {

		salesRepModel.Email = salesRepForm.Email
		salesRepModel.Phone = salesRepForm.Phone
		salesRepModel.FirstName = salesRepForm.FirstName
		salesRepModel.LastName = salesRepForm.LastName
	}

	quota, err := strconv.ParseInt(salesRepForm.Quota, 10, 64)

	if err != nil {
		if err = h.utils.WriteJSON(w, http.StatusBadRequest, "", "error"); err != nil {
			return
		}
	}

	salesRepModel.Quota = quota

	//Generate unique publicId and assign to sales rep
	if publicId, err := h.services.SalesRepService.GeneratePublicId(ctx); err == nil {

		salesRepModel.PublicId = publicId

	} else {

		if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	//query for sales role and if not error is present assign to sales rep
	salesRoleFilter := h.services.SalesRoleService.FilterPublicId(salesRepForm.Role)

	if err := h.services.SalesRoleService.FindRole(ctx, salesRoleFilter).Decode(&salesRepModel.Role); err != nil {
		if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	now := time.Now()

	salesRepModel.CreatedAt = now
	salesRepModel.UpdateAt = now

	//save mode to database
	if _, err := h.services.SalesRepService.InsertOne(ctx, salesRepModel, nil); err != nil {

		if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}
}
