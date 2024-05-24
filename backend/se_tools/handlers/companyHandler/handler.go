package companyhandler

import (
	"context"
	"net/http"
	"se_tools/models/company"
	"se_tools/models/opportunitystatus"
	pagedata "se_tools/models/pageData"
	"se_tools/repository"
	companyservice "se_tools/services/companyService"
	"se_tools/services/salesopportunityservice"
	"se_tools/services/salesopportunitystatusservice"
	userservice "se_tools/services/userService"
	"se_tools/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Handler struct {
	companyService           companyservice.Service
	db                       repository.DbRepository
	loginService             userservice.UserService
	opportunityService       salesopportunityservice.Service
	opportunitystatusService salesopportunitystatusservice.Service
	utils                    utils.Utilities
}

func (h *Handler) GetCompanies(w http.ResponseWriter, r *http.Request) {

	//get the context and defer the cancel
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	//page data
	var page pagedata.Page

	//get the claims and check for errors
	claims, err := h.loginService.ValidateTokenAndGetClaims(r)

	if err != nil {
		http.Error(w, "", http.StatusForbidden)
		return

	}

	//get claims subject
	subject := claims.Subject

	//get user object id and check for error
	saleEngId, err := primitive.ObjectIDFromHex(subject)

	if err != nil {
		http.Error(w, "Error converting to object id", http.StatusInternalServerError)
		return
	}

	//generate page data
	page.Page.GeneratePageData(r)

	//get the database client and check for error
	db, err := h.db.Database(ctx)

	if err != nil {
		http.Error(w, "Error connecting to database", http.StatusInternalServerError)
		return
	}

	//get the company collection
	companyCollection := h.companyService.CompanyCollection(db)

	//skip and limit for mongo query
	skip := page.Page.Offset
	limit := page.Page.Limit

	opts := options.Find().SetSkip(skip).SetLimit(limit).SetSort(bson.D{{Key: "updated_at", Value: 1}})

	salesEngineerFilter := h.companyService.FilterBySalesEngineer(saleEngId)

	//run query and check for error
	cursor, err := companyCollection.Find(ctx, salesEngineerFilter, opts)

	if err != nil {
		http.Error(w, "Error retrieving companies", http.StatusInternalServerError)
		return
	}

	//company models
	var companies []company.Model

	//decode the cursor and check for error
	err = cursor.All(ctx, &companies)

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	//get total count of companies
	count, err := companyCollection.CountDocuments(ctx, bson.M{})

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	//set the total count in page data
	page.Page.CalculatePageData(count)

	//opportunity collection
	opportunityCollection := h.opportunityService.SalesOpportunityCollection(db)

	//opportunity status collection
	opportunityStatusCollection := h.opportunitystatusService.SalesOpportunityStatusCollection(db)

	wonFilter := h.opportunitystatusService.FilterByWon()
	lostFilter := h.opportunitystatusService.FilterByLost()

	var wonStatus opportunitystatus.Model
	var lostStatus opportunitystatus.Model

	//get the won status and check for error
	err = opportunityStatusCollection.FindOne(ctx, wonFilter).Decode(&wonStatus)

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	//get the lost status and check for error
	err = opportunityStatusCollection.FindOne(ctx, lostFilter).Decode(&lostStatus)

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	var summaries []company.Summary

	for _, companyModel := range companies {

		var summary company.Summary

		openOppFilter := h.opportunityService.FilterByOpenStatus(wonStatus.ID, lostStatus.ID, companyModel.ID)

		//get open opportunity count and check for error execlude won and lost opps
		oppCount, err := opportunityCollection.CountDocuments(ctx, openOppFilter)

		if err != nil {
			http.Error(w, "", http.StatusInternalServerError)
			return
		}

		summary.ID = companyModel.PublicId
		summary.Name = companyModel.Name
		summary.Opportunities = int(oppCount)
		summary.Contacts = 0

		wonFilter := h.opportunityService.FilterOppPrice(companyModel.ID, wonStatus.ID)
		lostFilter := h.opportunityService.FilterOppPrice(companyModel.ID, lostStatus.ID)

		//get the value of won and lost opportunities , check for error and add to summary
		wonValue, err := h.opportunityService.OppPrice(ctx, db, wonFilter)

		if err != nil {
			http.Error(w, "", http.StatusInternalServerError)
			return
		}

		summary.ValueWon = wonValue

		lostValue, err := h.opportunityService.OppPrice(ctx, db, lostFilter)

		if err != nil {
			http.Error(w, "", http.StatusInternalServerError)
			return
		}

		summary.ValueLost = lostValue

		//get open opportunity value and check for error
		openValue, err := h.opportunityService.OppPrice(ctx, db, openOppFilter)

		if err != nil {
			http.Error(w, "", http.StatusInternalServerError)
			return
		}

		summary.OpenValue = openValue

		summary.Updated = companyModel.UpdatedAt

		//append summary to summaries
		summaries = append(summaries, summary)

	}

	page.Items = summaries

	//send data to client

	err = h.utils.WriteJSON(w, http.StatusOK, page, "data")

	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}
}
