package templatediscoveryhandlers

import (
	"context"
	"encoding/json"
	"net/http"
	discoveryquestiontemplate "se_tools/models/discoveryQuestionTemplate"
	pagedata "se_tools/models/pageData"
	"se_tools/models/questions"
	"se_tools/repository"
	discoveryquestionservices "se_tools/services/discoveryQuestionServices"
	discoverytemplatesservices "se_tools/services/discoveryTemplateservices"
	userservice "se_tools/services/userService"
	"se_tools/utils"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type Handler struct {
	db                        repository.DbRepository
	DiscoveryQuestionsService discoveryquestionservices.Service
	DiscoveryTemplateService  discoverytemplatesservices.Service
	userService               userservice.UserService
	utils                     utils.Utilities
}

// AddQuestionToTemplate godoc
func (h *Handler) AddQuestionToTemplate(w http.ResponseWriter, r *http.Request) {

	//get context from request and defer cancel
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	var questionPublicIds discoveryquestiontemplate.QuestionIds

	//decode request body and check for error
	err := json.NewDecoder(r.Body).Decode(&questionPublicIds)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//get path value id
	templatePublicId := r.PathValue("id")

	//get database client
	db, err := h.db.Database(ctx)

	//check for error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//get template by public id and check for error
	template, err := h.DiscoveryTemplateService.FindByPublicId(ctx, db, templatePublicId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//Delete all questions from template
	_, err = h.DiscoveryTemplateService.DeleteOrderModelByTemplateId(ctx, db, template.ID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var newOrderModelBson []interface{}

	for i, questionPublicId := range questionPublicIds.QuestionIds {

		count := int64(i + 1)

		questionResult, err := h.DiscoveryQuestionsService.FindByPublicId(ctx, db, questionPublicId)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		questionModel, err := h.DiscoveryTemplateService.ResultToModel(questionResult)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		bsonData := h.DiscoveryTemplateService.NewQuestionOrderBson(template.ID, questionModel.ID, count)

		newOrderModelBson = append(newOrderModelBson, bsonData)
	}

	templateCollection := h.DiscoveryTemplateService.TemplateQuestionOrderCollection(db)

	_, err = templateCollection.InsertMany(ctx, newOrderModelBson)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}

func (h *Handler) ChangeTemplateName(w http.ResponseWriter, r *http.Request) {

	//get context from request
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	var templateName discoveryquestiontemplate.NewDiscoveryTemplate

	//decode request body and check for error
	err := json.NewDecoder(r.Body).Decode(&templateName)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//get path value id
	templatePublicId := r.PathValue("id")

	//get database client
	db, err := h.db.Database(ctx)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//template collection
	tempCollection := h.DiscoveryTemplateService.Collection(db)

	//get template by public id and check for error
	template, err := h.DiscoveryTemplateService.FindByPublicId(ctx, db, templatePublicId)

	name := template.Name

	println(name)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return

	}

	if strings.Compare(templateName.Name, template.Name) != 0 {
		println("Name changed")
		name = templateName.Name

		nameBson := bson.M{"$set": bson.M{"name": name}}

		println(template.ID.Hex())

		filter := h.DiscoveryTemplateService.FilterById(template.ID)

		result, err := tempCollection.UpdateOne(ctx, filter, nameBson)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		println(result.ModifiedCount)
	}

	println(name)
	err = h.utils.WriteJSON(w, http.StatusOK, name, "data")

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

// get template questions godoc
func (h *Handler) GetTemplateQuestions(w http.ResponseWriter, r *http.Request) {

	//get context from request
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	//Summary page data return
	var templatePage discoveryquestiontemplate.TemplateData

	//get path value id
	templatePublicId := r.PathValue("id")

	//get page data
	var pageInfo pagedata.DTO

	pageInfo.GeneratePageData(r)

	// Get database client
	db, err := h.db.Database(ctx)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//get template by public id and check for error
	template, err := h.DiscoveryTemplateService.FindByPublicId(ctx, db, templatePublicId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	templateQuestions, err := h.DiscoveryTemplateService.FindTemplateQuestions(ctx, db, template.ID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	templateQuestionSummaries, err := h.DiscoveryTemplateService.TemplateQuestionsToTemplateSummaries(ctx, db, templateQuestions)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	templatePage.ID = template.PublicID
	templatePage.Name = template.Name
	templatePage.Questions = templateQuestionSummaries

	err = h.utils.WriteJSON(w, http.StatusOK, templatePage, "data")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}

// get questions for template form godoc
func (h *Handler) GetQuestionsForTemplateForm(w http.ResponseWriter, r *http.Request) {

	//get context from request
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	var pageInfo pagedata.DTO

	pageInfo.GeneratePageData(r)

	//get template publicId from path
	templatePublicId := r.PathValue("id")

	//get database client
	db, err := h.db.Database(ctx)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	template, err := h.DiscoveryTemplateService.FindByPublicId(ctx, db, templatePublicId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	result, err := h.DiscoveryQuestionsService.FindAll(ctx, db, pageInfo)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	questionModels, err := h.DiscoveryQuestionsService.CursorToModel(ctx, result)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var dtos []questions.DTO

	for _, question := range questionModels {

		questionDto, err := h.DiscoveryQuestionsService.GetModelTODto(ctx, question, db)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		inTemplate, err := h.DiscoveryTemplateService.QuestionExistsInTemplate(ctx, db, template.ID, question.ID)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		questionDto.InTemplated = inTemplate

		dtos = append(dtos, questionDto)
	}

	err = h.utils.WriteJSON(w, http.StatusOK, dtos, "data")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
