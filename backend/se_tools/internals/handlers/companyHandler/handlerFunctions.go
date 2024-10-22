package companyhandler

import (
	"context"
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/company"
	"se_tools/internals/models/embedded"
	"se_tools/internals/models/industry"
	optionsdto "se_tools/internals/models/optionsDto"
	"se_tools/internals/models/salesrep"
	"strconv"
	"strings"
	"time"
)

func (h *Handler) getCompanies(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	pageParam := r.URL.Query().Get("page")
	limitParam := r.URL.Query().Get("limit")

	contextMap := r.Context().Value(h.middleware.ContextKey).(map[string]string)

	userObjId, err := primitive.ObjectIDFromHex(contextMap["user_id"])

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	page, err := strconv.Atoi(pageParam)

	if err != nil {
		page = 0
	}

	limit, err := strconv.Atoi(limitParam)

	if err != nil {
		limit = 10
	}

	var companies []company.DTO

	filter := bson.D{{Key: "sales_engineer._id", Value: userObjId}}
	filterCompanyPipeline := h.services.CompanyService.FilterDTO(filter, limit, page, "name")

	if results, err := h.services.CompanyService.Pipeline(ctx, filterCompanyPipeline, nil); err != nil {
		println(err.Error())
		println("marker2")
		w.WriteHeader(http.StatusInternalServerError)
		return

	} else {

		if err := results.All(ctx, &companies); err != nil {
			println("marker1")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	println(len(companies))
	var summaries []company.Summary

	for _, dto := range companies {
		println("this")
		summaries = append(summaries, dto.ToSummary())
	}

	dataMap := make(map[string]interface{})

	dataMap["companies"] = summaries
	dataMap["page"] = page
	dataMap["limit"] = limit

	if err := h.utils.WriteJSON(w, http.StatusOK, dataMap, "data"); err != nil {

		return
	}

}

func (h *Handler) companyFormData(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	var salesRepModels []salesrep.Model
	var salesRepOptions []optionsdto.Option
	var salesEngineer appUser.User
	var industryModels []industry.Model
	var industryOptions []optionsdto.Option

	contextMap := r.Context().Value(h.middleware.ContextKey).(map[string]string)

	userObj, err := primitive.ObjectIDFromHex(contextMap["user_id"])

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	filterSalesEngineer := h.services.UserService.FilterId(userObj)

	if err := h.services.UserService.FindUser(ctx, filterSalesEngineer, nil).Decode(&salesEngineer); err != nil {

		w.WriteHeader(http.StatusBadRequest)
		return
	}

	engFilter := h.services.SalesRepService.FilterSalesEngineerId(userObj)
	salesRepOpts := options.Find().SetSort(bson.D{{Key: "first_name", Value: 1}, {Key: "last_name", Value: 1}})

	salesRepResults, err := h.services.SalesRepService.FindSalesReps(ctx, engFilter, salesRepOpts)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	} else {

		if err := salesRepResults.All(ctx, &salesRepModels); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	industryOpts := options.Find().SetSort(bson.M{"name": 1})
	industryResults, err := h.services.IndustryService.FindIndustries(ctx, bson.M{}, industryOpts)

	if err != nil {

		w.WriteHeader(http.StatusInternalServerError)
		return

	} else {

		if err := industryResults.All(ctx, &industryModels); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	for _, model := range salesRepModels {

		salesRepOptions = append(salesRepOptions, model.ModelToOptions())
	}

	for _, model := range industryModels {

		industryOptions = append(industryOptions, model.ToOption())
	}

	dataMap := make(map[string]interface{})

	dataMap["sales_reps"] = salesRepOptions
	dataMap["industries"] = industryOptions
	dataMap["csrf"] = salesEngineer.CsrfToken

	if err := h.utils.WriteJSON(w, http.StatusOK, dataMap, "form_data"); err != nil {
		return
	}

}

func (h *Handler) newCompany(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	var companyModel company.Model
	var industryModel industry.Model
	var newCompany company.NewUpdated
	var salesEngineer appUser.User
	var salesRep salesrep.Model

	//generate and set publicId
	publicId, err := h.services.CompanyService.GeneratePublicId(ctx)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	companyModel.PublicId = publicId

	//assigns contacts and se coverage to model
	companyModel.Contacts = []embedded.Model{}
	companyModel.CoverageSe = []embedded.Model{}

	if err := json.NewDecoder(r.Body).Decode(&newCompany); err != nil {

		w.WriteHeader(http.StatusBadRequest)
		return
	}

	params := r.Context().Value(h.middleware.ContextKey).(map[string]string)

	//validate new company return err of
	if err := newCompany.Validate(h.utils); err != nil {

		errorList := strings.Split(err.Error(), ":")
		errorMap := make(map[string]string)

		errorMap[errorList[0]] = errorList[1]

		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//add notes and names after validations
	companyModel.Notes = strings.TrimSpace(newCompany.Notes)
	companyModel.Name = strings.TrimSpace(newCompany.Name)

	userObjId, err := primitive.ObjectIDFromHex(params["user_id"])

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
	}

	userFilter := h.services.UserService.FilterId(userObjId)

	if err := h.services.UserService.FindUser(ctx, userFilter, nil).Decode(&salesEngineer); err != nil {

		w.WriteHeader(http.StatusBadRequest)
		return
	}

	embeddedSalesEngineer := salesEngineer.Embedded()

	//assign sales engineer and created By createdBy does not change once set
	companyModel.SalesEngineer = embeddedSalesEngineer
	companyModel.CreatedBy = embeddedSalesEngineer

	industryFilter := h.services.IndustryService.FilterPublicId(newCompany.Industry)
	if err := h.services.IndustryService.FindIndustry(ctx, industryFilter, nil).Decode(&industryModel); err != nil {

		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	companyModel.Industry = industryModel.ToEmbedded()

	salesRepFilter := h.services.SalesRepService.FilterPublicId(newCompany.SalesRep)

	if err := h.services.SalesRepService.FindSalesRep(ctx, salesRepFilter, nil).Decode(&salesRep); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//assign sales reps
	companyModel.SalesRep = salesRep.ModelToEmbedded()

	now := time.Now()

	companyModel.UpdatedAt = now
	companyModel.CreatedAt = now

	if _, err := h.services.CompanyService.Save(ctx, companyModel); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

}
