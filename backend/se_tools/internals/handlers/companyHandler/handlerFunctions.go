package companyhandler

import (
	"context"
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"se_tools/internals/models/Contact"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/company"
	"se_tools/internals/models/industry"
	optionsdto "se_tools/internals/models/optionsDto"
	"se_tools/internals/models/salesrep"
	"se_tools/internals/models/salesroles"
	"strconv"
	"strings"
	"time"
)

func (h *Handler) getCompanies(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	pageParam := r.URL.Query().Get("page")
	limitParam := r.URL.Query().Get("limit")

	page, err := strconv.Atoi(pageParam)

	if err != nil {
		page = 0
	}

	limit, err := strconv.Atoi(limitParam)

	if err != nil {
		limit = 10
	}

	var companies []company.Model

	opts := options.Find().SetLimit(int64(limit)).SetSkip(int64(page * limit)).SetSort(bson.M{"name": 1})

	results, err := h.services.CompanyService.FindCompanies(ctx, bson.M{}, opts)

	if err != nil {
		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	} else {
		if err := results.All(ctx, &companies); err != nil {
			if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
				return
			}
		}
	}

}

func (h *Handler) companyFormData(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	var salesRepModels []salesroles.Model
	var salesRepOptions []optionsdto.Option
	var industryModels []industry.Model
	var industryOptions []optionsdto.Option

	salesRepOpts := options.Find().SetSort(bson.D{{Key: "first_name", Value: 1}, {Key: "last_name", Value: 1}})
	salesRepResults, err := h.services.SalesRepService.FindSalesReps(ctx, bson.M{}, salesRepOpts)

	if err != nil {
		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	} else {

		if err := salesRepResults.All(ctx, &salesRepModels); err != nil {
			if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
				return
			}
		}
	}

	industryOpts := options.Find().SetSort(bson.M{"name": 1})
	industryResults, err := h.services.IndustryService.FindIndustries(ctx, bson.M{}, industryOpts)

	if err != nil {
		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}

	} else {

		if err := industryResults.All(ctx, &industryModels); err != nil {
			if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
				return
			}
		}
	}

	for _, model := range salesRepModels {

		salesRepOptions = append(salesRepOptions, model.ModelToOption())
	}

	for _, model := range industryModels {

		industryOptions = append(industryOptions, model.ToOption())
	}

	dataMap := make(map[string]interface{})

	dataMap["sales_reps"] = salesRepOptions
	dataMap["industries"] = industryOptions

	if err := h.utils.WriteJSON(w, http.StatusOK, dataMap, "form_data"); err != nil {
		return
	}

}

func (h *Handler) newCompany(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	var companyModel company.Model
	var contacts []Contact.Contact
	var coverageSe []appUser.Embedded
	var industryModel industry.Model
	var newCompany company.NewUpdated
	var salesEngineer appUser.User
	var salesRep salesrep.Model

	//generate and set publicId
	publicId, err := h.services.CompanyService.GeneratePublicId(ctx)

	if err != nil {
		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	companyModel.PublicId = publicId

	//assigns contacts and se coverage to model
	companyModel.Contacts = contacts
	companyModel.CoverageSe = coverageSe

	if err := json.NewDecoder(r.Body).Decode(&newCompany); err != nil {

		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", ""); err != nil {

			return
		}
	}

	params := r.Context().Value("params").(map[string]interface{})

	//validate new company return err of
	if err := newCompany.Validate(h.utils); err != nil {

		errorList := strings.Split(err.Error(), ":")
		errorMap := make(map[string]string)

		errorMap[errorList[0]] = errorList[1]

		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, errorMap, "error"); err != nil {

			return
		}
	}

	//add notes and names after validations
	companyModel.Notes = strings.TrimSpace(newCompany.Notes)
	companyModel.Name = strings.TrimSpace(newCompany.Name)

	userFilter := h.services.UserService.FilterPublicId(params["user_id"].(string))

	if err := h.services.UserService.FindUser(ctx, userFilter, nil).Decode(&salesEngineer); err != nil {

		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	embeddedSalesEngineer := salesEngineer.Embedded()

	//assign sales engineer and created By createdBy does not change once set
	companyModel.SalesEngineer = embeddedSalesEngineer
	companyModel.CreatedBy = embeddedSalesEngineer

	industryFilter := h.services.IndustryService.FilterPublicId(newCompany.Industry)
	if err := h.services.IndustryService.FindIndustry(ctx, industryFilter, nil).Decode(&industryModel); err != nil {

		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	companyModel.Industry = industryModel

	salesRepFilter := h.services.SalesRepService.FilterPublicId(newCompany.SalesRep)

	if err := h.services.SalesRepService.FindSalesRep(ctx, salesRepFilter, nil).Decode(&salesRep); err != nil {
		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	//assign sales reps
	companyModel.SalesRep = salesRep.ModelToEmbedded()

	now := time.Now()

	companyModel.UpdatedAt = now
	companyModel.CreatedAt = now

	if _, err := h.services.CompanyService.Save(ctx, companyModel); err != nil {
		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

}
