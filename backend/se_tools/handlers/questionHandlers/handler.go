package questionHandlers

import (
	"context"
	"encoding/json"
	"net/http"
	pagedata "se_tools/models/pageData"
	"se_tools/models/questions"
	"se_tools/repository"
	categoryservice "se_tools/services/categoryService"
	discoveryquestionservices "se_tools/services/discoveryQuestionServices"
	industryservice "se_tools/services/industryService"
	userservice "se_tools/services/userService"
	"se_tools/utils"
	"time"
)

type Handler struct {
	utils           utils.Utilities
	category        categoryservice.Service
	db              repository.DbRepository
	industry        industryservice.Service
	questionservice discoveryquestionservices.Service
	userservice     userservice.UserService
}

func (h *Handler) GetQuestions(w http.ResponseWriter, r *http.Request) {

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	db, err := h.db.Database(ctx)

	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	var pageData pagedata.DTO

	err = pageData.GeneratePageData(r)

	if err != nil {
		http.Error(w, "Error getting page data", http.StatusInternalServerError)
		return
	}

	//get questions from database
	questions, err := h.questionservice.GetQuestions(ctx, db, pageData)

	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	//send questions to client

	err = h.utils.WriteJSON(w, http.StatusOK, questions, "questions")

	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}
}

func (h *Handler) NewQuestion(w http.ResponseWriter, r *http.Request) {

	//get context and cancel function set timeout to 3 seconds
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	//get claims form token and check for error
	claims, err := h.userservice.ValidateTokenAndGetClaims(r)

	if err != nil {
		println(err.Error())
		println("error claims")
		http.Error(w, "invalid user", http.StatusForbidden)
		return
	}

	var newQUestion questions.NewQuestion

	//decode requested body and check for error
	err = json.NewDecoder(r.Body).Decode(&newQUestion)

	if err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}

	//get database connection and check for error
	db, err := h.db.Database(ctx)

	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	//validate question error indicates invalid question format
	err = newQUestion.ValidateQuestion()

	if err != nil {
		http.Error(w, "invalid question", http.StatusBadRequest)
		return
	}

	//get category ids from database if not found return error
	categories, err := h.category.GetCategoryIds(ctx, db, newQUestion.Categories)

	if err != nil {
		http.Error(w, "invalid category", http.StatusBadRequest)
		return
	}

	//get industry from database if not found return error
	industries, err := h.industry.GetIndustryIds(ctx, db, newQUestion.Industries)

	if err != nil {
		http.Error(w, "invalid industry", http.StatusBadRequest)
		return
	}

	//find user by token and check for error
	user, err := h.userservice.FindUserByIdString(ctx, db, claims.Subject)

	if err != nil {
		println("error here")
		println(err.Error())
		http.Error(w, "invalid user", http.StatusForbidden)
		return
	}

	//create question object for new questions
	var question questions.SaveQuestion

	println(len(categories))
	println(len(industries))
	question.Question = newQUestion.Question
	question.Categories = append(question.Categories, categories...)
	question.Industries = append(question.Industries, industries...)
	question.Author = user.ID

	//save question to database and check for error
	_, err = h.questionservice.Save(ctx, db, question)

	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	//send success message to client
	err = h.utils.WriteJSON(w, http.StatusOK, "success", "message")

	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}
}
