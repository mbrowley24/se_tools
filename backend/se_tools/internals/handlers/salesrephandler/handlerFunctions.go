package salesrephandler

import (
	"context"
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/embedded"
	"se_tools/internals/models/salesrep"
	"strconv"
	"strings"
	"time"
)

// GetSalesReps get a list of sales reps but Users id
func (h *Handler) getSalesReps(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	var salesRepDTOs []salesrep.DTO
	var salesRepSummaries []salesrep.Summary

	//get data from context in the form of a map
	contextMap := r.Context().Value(h.middleware.ContextKey).(map[string]string)

	userId := contextMap["user_id"]

	userObjectId, err := primitive.ObjectIDFromHex(userId)

	if err != nil {
		println("marker1")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//Query filter for sales reps that are assigned to the SE or match on of the SE that are covering sales rep
	filter := bson.D{
		{"$or", bson.A{
			bson.D{{"sales_engineer._id", userObjectId}},
			bson.D{{"coverage_se._id", bson.D{
				{"$elemMatch", bson.D{
					{"$eq", userObjectId},
				}},
			}}},
		}},
	}
	pipelineFilter := h.services.SalesRepService.FilterDTO(filter)
	results, err := h.services.SalesRepService.Pipeline(ctx, pipelineFilter, nil)

	if err != nil {
		println(err.Error())
		println("marker2")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//decode sales reh. Place sales reps in a DTO before sending to front-end
	if err = results.All(ctx, &salesRepDTOs); err != nil {

		println("marker3")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//convert sales reps to DTO for front-end use
	for _, salesRep := range salesRepDTOs {

		salesRepSummaries = append(salesRepSummaries, salesRep.DTOToSummary())
	}

	//return data to user. The data at this point should be converted to DTO to remove sensitive data and primary key
	//info from the database
	if err = h.utils.WriteJSON(w, http.StatusOK, salesRepSummaries, "sales_reps"); err != nil {
		return
	}
}

func (h *Handler) postSalesRep(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	var salesRepForm salesrep.Form
	var salesRepModel salesrep.Model
	var salesEngineer appUser.User

	//Get user data from context. Data is inserted into to context when the cookie and jwt are validated
	params, ok := ctx.Value(h.middleware.ContextKey).(map[string]string)

	if !ok {

		w.WriteHeader(http.StatusBadRequest)
		return
	}

	salesRepModel.Version = 1
	salesRepModel.CoverageSE = []embedded.Model{}

	userId, err := primitive.ObjectIDFromHex(params["user_id"])

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//get login sales Engineer and assign to new sales rep
	userFilter := h.services.UserService.FilterId(userId)

	if err := h.services.UserService.FindUser(ctx, userFilter, nil).Decode(&salesEngineer); err != nil {

		w.WriteHeader(http.StatusBadRequest)
		return
	}

	salesRepModel.SalesEngineer = salesEngineer.Embedded()

	//pull from data from request sent from front-end
	if err := json.NewDecoder(r.Body).Decode(&salesRepForm); err != nil {

		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//check if the csrf token match in the database and the form
	if strings.Compare(salesEngineer.CsrfToken, salesRepForm.CSRF) != 0 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//validate sales rep form data
	if err := salesRepForm.Validate(); err != nil {

		w.WriteHeader(http.StatusBadRequest)
		return

	} else {

		salesRepModel.Email = salesRepForm.Email
		salesRepModel.Phone = salesRepForm.Phone
		salesRepModel.FirstName = salesRepForm.FirstName
		salesRepModel.LastName = salesRepForm.LastName
	}

	quota, err := strconv.ParseInt(salesRepForm.Quota, 10, 64)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	salesRepModel.Quota = quota

	//Generate unique publicId and assign to sales rep
	if publicId, err := h.services.SalesRepService.GeneratePublicId(ctx); err == nil {

		salesRepModel.PublicId = publicId

	} else {

		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//query for sales role and if not error is present assign to sales rep
	salesRoleFilter := h.services.SalesRoleService.FilterPublicId(salesRepForm.Role)

	if err := h.services.SalesRoleService.FindRole(ctx, salesRoleFilter).Decode(&salesRepModel.Role); err != nil {
		w.WriteHeader(http.StatusBadRequest)
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
