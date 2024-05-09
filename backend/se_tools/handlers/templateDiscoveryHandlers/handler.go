package templatediscoveryhandlers

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
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

	"github.com/unidoc/unipdf/v3/common/license"
	"github.com/unidoc/unipdf/v3/creator"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
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
		println(err.Error())
		println("mark 1")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//Delete all questions from template
	_, err = h.DiscoveryTemplateService.DeleteOrderModelByTemplateId(ctx, db, template.ID)

	if err != nil {
		println(err.Error())
		println("mark 2")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var newOrderModelBson []interface{}

	for i, questionPublicId := range questionPublicIds.QuestionIds {

		count := int64(i + 1)

		questionResult, err := h.DiscoveryQuestionsService.FindByPublicId(ctx, db, questionPublicId)

		if err != nil {
			println(err.Error())
			println("mark 3")
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		questionModel, err := h.DiscoveryTemplateService.ResultToModel(questionResult)

		if err != nil {
			println(err.Error())
			println("mark 4")
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		bsonData := h.DiscoveryTemplateService.NewQuestionOrderBson(template.ID, questionModel.ID, count)

		newOrderModelBson = append(newOrderModelBson, bsonData)
	}

	println(len(newOrderModelBson))
	//check if there are new questions to add to template
	if len(newOrderModelBson) > 0 {
		templateCollection := h.DiscoveryTemplateService.TemplateQuestionOrderCollection(db)

		_, err = templateCollection.InsertMany(ctx, newOrderModelBson)

		if err != nil {
			println(err.Error())
			println("mark 5")
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	templateQuestions, err := h.DiscoveryTemplateService.FindTemplateQuestions(ctx, db, template.ID)

	if err != nil {
		println(err.Error())
		println("mark 6")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	summaries, err := h.DiscoveryTemplateService.TemplateQuestionsToTemplateSummaries(ctx, db, templateQuestions)

	if err != nil {
		println(err.Error())
		println("mark 7")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = h.utils.WriteJSON(w, http.StatusOK, summaries, "data")

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

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return

	}

	if strings.Compare(templateName.Name, template.Name) != 0 {

		name = templateName.Name

		nameBson := bson.M{"$set": bson.M{"name": name}}

		println(template.ID.Hex())

		filter := h.DiscoveryTemplateService.FilterById(template.ID)

		_, err := tempCollection.UpdateOne(ctx, filter, nameBson)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

	}

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

func (h *Handler) GeneratePDF(w http.ResponseWriter, r *http.Request) {

	println("Generate PDF")
	//get context from request and defer cancel
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	licenseKey, err := h.utils.Env("PDF_KEY")

	if err != nil {
		println(err.Error())
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	hasLicense := license.GetLicenseKey()

	err = hasLicense.Validate()

	if err != nil {

		//verfiy pdf license
		err = license.SetMeteredKey(licenseKey)

		if err != nil {

			http.Error(w, "internal error", http.StatusInternalServerError)
			return
		}
	}

	//get pdf creator
	c := creator.New()

	//validate user claims, retrive claims and check for error
	claims, err := h.userService.ValidateTokenAndGetClaims(r)

	if err != nil {
		println(err.Error())
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	//get database client and check for error
	db, err := h.db.Database(ctx)

	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	//find user by id string and check for error
	user, err := h.userService.FindUserByIdString(ctx, db, claims.Subject)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	println(user.Username)
	//get template public id from path
	templatePublicId := r.PathValue("id")

	//get template by public id and check for error
	template, err := h.DiscoveryTemplateService.FindByPublicId(ctx, db, templatePublicId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	templateAuthor, err := h.userService.FindUserById(ctx, db, template.Author)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	heading := c.NewParagraph("Discovery Template")
	heading.SetFontSize(25)
	heading.SetPos(200, 25)
	heading.SetWidth(500)

	err = c.Draw(heading)

	if err != nil {
		println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	titleName := fmt.Sprintf("Title: %s", template.Name)

	titleHeading := c.NewParagraph(titleName)
	titleHeading.SetFontSize(10)
	titleHeading.SetPos(250, 55)
	titleHeading.SetWidth(500)

	err = c.Draw(titleHeading)

	if err != nil {
		println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	authorName := fmt.Sprintf("Author: %s %s", templateAuthor.FirstName, templateAuthor.LastName)

	authorHeading := c.NewParagraph(authorName)
	authorHeading.SetFontSize(10)
	authorHeading.SetPos(250, 70)
	authorHeading.SetWidth(500)

	err = c.Draw(authorHeading)

	if err != nil {
		println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//get template questions and check for error
	templateOrderCollection := h.DiscoveryTemplateService.TemplateQuestionOrderCollection(db)

	//create filter for template id
	templateFilter := h.DiscoveryTemplateService.FilterByTemplateId(template.ID)

	//find template questions and check for error
	results, err := templateOrderCollection.Find(ctx, templateFilter)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//get questions order from crusor and check for error
	questionOrder, err := h.DiscoveryTemplateService.CrusorToQuestionOrder(ctx, results)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//get questions from order and check for error
	questionsDto, err := h.DiscoveryQuestionsService.QuestionOrderToDto(ctx, db, questionOrder)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	pos := float64(150)

	for i, dto := range questionsDto {

		if i != 0 {
			pos += 100
		}

		paragraph := c.NewParagraph(dto.Question)
		paragraph.SetPos(50, pos)
		paragraph.SetWidth(500)
		c.Draw(paragraph)
	}

	buf := new(bytes.Buffer)

	err = c.Write(buf)
	if err != nil {
		println("Error writing PDF: %v", err.Error())
		http.Error(w, "", http.StatusInternalServerError)
		return
	}

	println("PDF Generated here")

	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Content-Disposition", "attachment; filename=\"template.pdf\"")

	_, err = w.Write(buf.Bytes())

	if err != nil {
		println(err.Error())
		http.Error(w, "", http.StatusInternalServerError)
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

	//set template name and publicId
	templatePage.Name = template.Name
	templatePage.ID = template.PublicID

	//get template questions and check for error
	discoveryTemplateService := h.DiscoveryTemplateService.TemplateQuestionOrderCollection(db)

	//filter by template id
	filter := h.DiscoveryTemplateService.FilterByTemplateId(template.ID)

	//find options
	opts := options.Find().SetSort(bson.D{{Key: "order", Value: 1}}).SetLimit(pageInfo.Limit).SetSkip(pageInfo.Offset)

	//find template questions and check for error
	templateQuestions, err := discoveryTemplateService.Find(ctx, filter, opts)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//get template questions and check for error
	questionsOrder, err := h.DiscoveryTemplateService.CrusorToQuestionOrder(ctx, templateQuestions)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//get questions from template

	dtos, err := h.DiscoveryQuestionsService.QuestionOrderToDto(ctx, db, questionsOrder)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	templatePage.Questions = dtos

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
