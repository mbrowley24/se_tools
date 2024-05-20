package salesrolehandlers

import (
	"context"
	"net/http"
	"se_tools/repository"
	"se_tools/services/salesroleservice"
	"se_tools/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type Handler struct {
	DB               repository.DbRepository
	SalesRoleService salesroleservice.Service
	util             utils.Utilities
}

func (h *Handler) GetSalesRoles(w http.ResponseWriter, r *http.Request) {

	//context with timeout
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	//database connection and check for error
	db, err := h.DB.Database(ctx)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//filter for querry
	filter := bson.M{}

	//get sales role collection
	salesRopeCollection := h.SalesRoleService.SalesRoleCollection(db)

	//query results and check for error
	results, err := salesRopeCollection.Find(ctx, filter)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//results to models and check for error
	roleModels, err := h.SalesRoleService.ResultsToModels(ctx, results)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//convert models to options
	options := h.SalesRoleService.ModelsToOptions(roleModels)

	err = h.util.WriteJSON(w, http.StatusOK, options, "data")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}
