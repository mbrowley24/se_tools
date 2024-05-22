package salesrephandler

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	optionsdto "se_tools/models/optionsDto"
	"se_tools/models/salesrep"
	"se_tools/repository"
	salesrepservice "se_tools/services/salesRepService"
	"se_tools/services/salesroleservice"
	userservice "se_tools/services/userService"
	"se_tools/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Handler struct {
	DB               repository.DbRepository
	SalesRepService  salesrepservice.Service
	SalesRoleService salesroleservice.Service
	loginService     userservice.UserService
	userservice      userservice.Service
	utils            utils.Utilities
}

func (h *Handler) CheckEmail(w http.ResponseWriter, r *http.Request) {

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	db, err := h.DB.Database(ctx)

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	_, err = h.loginService.ValidateTokenAndGetClaims(r)

	if err != nil {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	email := r.URL.Query().Get("email")

	if email == "" {
		h.utils.WriteJSON(w, http.StatusOK, false, "data")
		return
	}

	exists, err := h.userservice.CheckEmail(ctx, db, email)

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	err = h.utils.WriteJSON(w, http.StatusOK, exists, "data")

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}
}

// GetSalesReps gets sales reps
func (h *Handler) GetSalesReps(w http.ResponseWriter, r *http.Request) {

	// Get sales reps
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	db, err := h.DB.Database(ctx)

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	claims, err := h.loginService.ValidateTokenAndGetClaims(r)

	if err != nil {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	engineerIdString := claims.Subject

	EngineerObjectId, err := primitive.ObjectIDFromHex(engineerIdString)

	if err != nil {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	salesEngineerFilter := h.SalesRepService.FilterBySalesEngineer(EngineerObjectId)

	saleRepCollection := h.SalesRepService.SalesRepCollection(db)

	salesRepsResult, err := saleRepCollection.Find(ctx, salesEngineerFilter)

	if err != nil {
		println("error1")
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	salesRepModels, err := h.SalesRepService.CrusorToModel(ctx, salesRepsResult)

	if err != nil {

		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	salesRepsDtos, err := h.SalesRepService.ModelsToDTOs(ctx, salesRepModels, db)

	if err != nil {
		println("error3")
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	err = h.utils.WriteJSON(w, http.StatusOK, salesRepsDtos, "data")

	if err != nil {
		println("error4")
		http.Error(w, "", http.StatusInternalServerError)
		return
	}
}

// get my sales reps
func (h *Handler) GetMySalesReps(w http.ResponseWriter, r *http.Request) {

	// Get sales reps
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	db, err := h.DB.Database(ctx)

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	claims, err := h.loginService.ValidateTokenAndGetClaims(r)

	if err != nil {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	engineerIdString := claims.Subject

	EngineerObjectId, err := primitive.ObjectIDFromHex(engineerIdString)

	if err != nil {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	salesEngineerFilter := h.SalesRepService.FilterBySalesEngineer(EngineerObjectId)

	saleRepCollection := h.SalesRepService.SalesRepCollection(db)

	salesRepsResult, err := saleRepCollection.Find(ctx, salesEngineerFilter)

	if err != nil {
		println("error1")
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	salesRepModels, err := h.SalesRepService.CrusorToModel(ctx, salesRepsResult)

	if err != nil {

		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	var salesRepsDtos []optionsdto.Option

	for _, salesRepModel := range salesRepModels {

		salesRepsDtos = append(salesRepsDtos, optionsdto.Option{
			Value: salesRepModel.PublicId,
			Name:  fmt.Sprintf("%s %s", h.utils.Capitalize(salesRepModel.FirstName), h.utils.Capitalize(salesRepModel.LastName)),
		})
	}

	err = h.utils.WriteJSON(w, http.StatusOK, salesRepsDtos, "data")

	if err != nil {
		println("error4")
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

}

// new sales rep
func (h *Handler) NewSalesRep(w http.ResponseWriter, r *http.Request) {

	// Get sales reps
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	//new sales rep container
	var newRep salesrep.NewSalesRep

	//decode request body and check for error
	err := json.NewDecoder(r.Body).Decode(&newRep)

	if err != nil {
		println(err.Error())
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	//get database connection and check for error
	db, err := h.DB.Database(ctx)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//get claims and check for error
	claims, err := h.loginService.ValidateTokenAndGetClaims(r)

	if err != nil {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	//get engineer id
	engineerIdString := claims.Subject

	//validate new sales rep and check for error if new rep isn't valid
	err = newRep.Validate()

	if err != nil {
		println(err.Error())
		println("falied validation")
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	//get user collection and check for error
	user, err := h.loginService.FindUserByIdString(ctx, db, engineerIdString)

	if err != nil {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	salesRepCollection := h.SalesRepService.SalesRepCollection(db)

	// Get sales role collection
	salesRoleCollection := h.SalesRoleService.SalesRoleCollection(db)

	// Get sales role by public id
	salesRolePublicIdFilter := h.SalesRoleService.FilterByPublicId(newRep.Role)

	//find sales role and check for error
	salesRoleResult := salesRoleCollection.FindOne(ctx, salesRolePublicIdFilter)

	//result to model and check for error
	salesRoleModel, err := h.SalesRoleService.ResultToModel(salesRoleResult)

	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	//create new sales rep model bson and check for error
	salesRepData, err := h.SalesRepService.NewSalesRep(ctx, salesRepCollection, newRep, user.ID, salesRoleModel.ID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//insert new sales rep and check for error
	_, err = salesRepCollection.InsertOne(ctx, salesRepData)

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	//write response
	err = h.utils.WriteJSON(w, http.StatusOK, nil, "data")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
