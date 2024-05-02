package templatediscoveryhandlers

import (
	"context"
	"encoding/json"
	"net/http"
	discoveryquestiontemplate "se_tools/models/discoveryQuestionTemplate"
	pagedata "se_tools/models/pageData"
	"se_tools/repository"
	discoverytemplatesservices "se_tools/services/discoveryTemplateservices"
	userservice "se_tools/services/userService"
	"se_tools/utils"
	"time"
)

type Handler struct {
	db                       repository.DbRepository
	DiscoveryTemplateService discoverytemplatesservices.Service
	userService              userservice.UserService
	utils                    utils.Utilities
}

// GetTemplateDiscoverySummary godoc
func (h *Handler) GetTemplateDiscoverySummary(w http.ResponseWriter, r *http.Request) {

	//get context from request
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	//get page data
	var pageInfo pagedata.DTO

	pageInfo.GeneratePageData(r)

	// Get database client
	db, err := h.db.Database(ctx)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get collection
	data, err := h.DiscoveryTemplateService.FindAllTemplates(ctx, db, pageInfo)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = h.utils.WriteJSON(w, http.StatusOK, data, "data")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

// CreateTemplateDiscovery godoc'
func (h *Handler) CreateTemplateDiscovery(w http.ResponseWriter, r *http.Request) {

	//get context from request
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	//get database client
	db, err := h.db.Database(ctx)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return

	}

	//validate token and get claims and check for erro
	claims, err := h.userService.ValidateTokenAndGetClaims(r)

	if err != nil {

		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//find user by token and check for error
	user, err := h.userService.FindUserByIdString(ctx, db, claims.Subject)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	println(user.Username)

	var newTemplate discoveryquestiontemplate.NewDiscoveryTemplate

	err = json.NewDecoder(r.Body).Decode(&newTemplate)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	newTemplate.Author = user.ID

	//get page data
	var pageInfo pagedata.DTO

	pageInfo.GeneratePageData(r)

	//create new template and check for error
	_, err = h.DiscoveryTemplateService.NewTemplate(ctx, db, newTemplate)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = h.utils.WriteJSON(w, http.StatusOK, "", "data")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
