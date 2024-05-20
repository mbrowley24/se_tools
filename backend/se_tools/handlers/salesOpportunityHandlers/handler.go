package salesopportunityhandlers

import (
	"context"
	"net/http"
	pagedata "se_tools/models/pageData"
	"se_tools/repository"
	"se_tools/services/salesopportunityservice"
	userservice "se_tools/services/userService"
	"se_tools/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Handler struct {
	db              repository.DbRepository
	salesOppService salesopportunityservice.Service
	userservice     userservice.UserService
	utils           utils.Utilities
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
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//get user claims and check for errors
	claims, err := h.userservice.ValidateTokenAndGetClaims(r)

	if err != nil {
		http.Error(w, err.Error(), http.StatusForbidden)
		return
	}

	userId := claims.Subject

	//get sales engineer id and check for errors
	engineerId, err := primitive.ObjectIDFromHex(userId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//get page data and check for errors
	oppPage, err := h.salesOppService.FindBySalesEngineer(ctx, db, engineerId, pageInfo)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//write json response and check for errors
	err = h.utils.WriteJSON(w, http.StatusOK, oppPage, "data")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}
