package salesopportunityhandlers

import (
	"context"
	"encoding/json"
	"net/http"
	pagedata "se_tools/models/pageData"
	salesopportunity "se_tools/models/salesOpportunity"
	"se_tools/repository"
	salesrepservice "se_tools/services/salesRepService"
	"se_tools/services/salesopportunityservice"
	"se_tools/services/salesopportunitystatusservice"
	userservice "se_tools/services/userService"
	"se_tools/utils"
	"strconv"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Handler struct {
	db                    repository.DbRepository
	salesOppService       salesopportunityservice.Service
	salesOppStatusService salesopportunitystatusservice.Service
	salesRepService       salesrepservice.Service
	userservice           userservice.UserService
	utils                 utils.Utilities
}

func (h *Handler) GetOpportunities(w http.ResponseWriter, r *http.Request) {

	// get context
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	var pageInfo pagedata.DTO

	pageInfo.GeneratePageData(r)

	// get database and check for errors
	db, err := h.db.Database(ctx)

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	//get user claims and check for errors
	claims, err := h.userservice.ValidateTokenAndGetClaims(r)

	if err != nil {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	userId := claims.Subject

	//get sales engineer id and check for errors
	engineerId, err := primitive.ObjectIDFromHex(userId)

	if err != nil {
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	//get page data and check for errors
	oppPage, err := h.salesOppService.FindBySalesEngineer(ctx, db, engineerId, pageInfo)

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	//write json response and check for errors
	err = h.utils.WriteJSON(w, http.StatusOK, oppPage, "data")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}

func (h *Handler) NewOppotunity(w http.ResponseWriter, r *http.Request) {

	// get context
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	var newOpp salesopportunity.New
	var newOppModel salesopportunity.Create

	err := json.NewDecoder(r.Body).Decode(&newOpp)

	if err != nil {
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	err = newOpp.Validate()

	if err != nil {
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	newOppModel.Name = newOpp.Name

	//convert amount string to float and check for error
	newOppModel.Amount, err = strconv.ParseFloat(newOpp.Amount, 64)

	if err != nil {
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	//convert close date string to time and check for error
	newOppModel.CloseDate, err = time.Parse(h.utils.DateFormat(), newOpp.CloseDate)

	if err != nil {
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	// get database and check for errors
	db, err := h.db.Database(ctx)

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	publicId, err := h.salesOppService.GenerateByPublicId(ctx, db)

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	newOppModel.PublicId = publicId

	//get user claims and check for errors
	claims, err := h.userservice.ValidateTokenAndGetClaims(r)

	if err != nil {
		http.Error(w, "", http.StatusForbidden)
		return
	}

	userId := claims.Subject

	//get sales engineer id and check for errors
	engineer, err := h.userservice.FindUserByIdString(ctx, db, userId)

	if err != nil {
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	newOppModel.SalesEngineer = engineer.ID

	//get sales rep collection
	saleOppStatus, err := h.salesOppStatusService.FindByPublicId(ctx, db, newOpp.Status)

	if err != nil {
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	//set status id objectId
	newOppModel.Status = saleOppStatus.ID

	salesRep, err := h.salesRepService.FindByPublicId(ctx, db, newOpp.SalesRep)

	if err != nil {
		http.Error(w, "", http.StatusBadRequest)
		return
	}

	newOppModel.SalesRep = salesRep.ID

	if newOpp.Description != "" {
		newOppModel.Description = newOpp.Description
	}

	now := time.Now()
	newOppModel.CreatedAt = now
	newOppModel.UpdatedAt = now

	_, err = h.salesOppService.Save(ctx, db, newOppModel)

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}
}
