package questionHandlers

import (
	"context"
	"encoding/json"
	"net/http"
	discoveryquestionlikes "se_tools/models/discovery_question_likes"
	pagedata "se_tools/models/pageData"
	"se_tools/models/questions"
	"se_tools/repository"
	categoryservice "se_tools/services/categoryService"
	discoveryquestionservices "se_tools/services/discoveryQuestionServices"
	industryservice "se_tools/services/industryService"
	userservice "se_tools/services/userService"
	"se_tools/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Handler struct {
	utils           utils.Utilities
	category        categoryservice.Service
	db              repository.DbRepository
	industry        industryservice.Service
	questionservice discoveryquestionservices.Service
	userservice     userservice.UserService
}

// GetQuestions get questions from database and send to client
func (h *Handler) GetQuestions(w http.ResponseWriter, r *http.Request) {

	var questionData questions.DiscoveryQuestionPage
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

	questionCollection := db.Collection(h.questionservice.DiscoveryQuestionCollection())

	//get total questions from database
	total, err := questionCollection.CountDocuments(ctx, bson.D{}) //get total questions from database

	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	//set total items to page data
	pageData.CalculatePageData(total)

	questionData.PageInfo = pageData

	//get questions from database
	questionData.Questions, err = h.questionservice.GetQuestions(ctx, db, pageData)

	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	//send questions to client

	err = h.utils.WriteJSON(w, http.StatusOK, questionData, "data")

	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}
}

// LikeQuestion like or unlike question and returns updated question
func (h *Handler) LikeQuestion(w http.ResponseWriter, r *http.Request) {

	//get context and cancel function set timeout to 3 seconds
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	//get like data from request body and check for error
	var like discoveryquestionlikes.DTO

	err := json.NewDecoder(r.Body).Decode(&like)

	if err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return

	}

	//get claims form token and check for error
	claims, err := h.userservice.ValidateTokenAndGetClaims(r)

	if err != nil {
		println(err.Error())
		println("error claims")
		http.Error(w, "invalid user", http.StatusForbidden)
		return
	}

	//get database connection and check for error
	db, err := h.db.Database(ctx)

	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
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

	//get discovery question collection
	discoveryQuestionCollection := db.Collection(h.questionservice.DiscoveryQuestionCollection())

	//query question by public id and check for error
	result := discoveryQuestionCollection.FindOne(ctx, h.questionservice.FilterByPublicId(like.ID))

	if result.Err() != nil {
		http.Error(w, "invalid question", http.StatusBadRequest)
		return

	}

	//decode question and check for error
	question, err := h.questionservice.GetDiscoveryQuestionModel(result)

	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return

	}

	//get discovery question likes collection
	discoveryQuestionLikesCollection := db.Collection(h.questionservice.DiscoveryQuestionLikesCollection())

	//my like filter
	myLikeFilter := h.questionservice.FilterMyLike(user.ID, question.ID)

	//query like by user and question and check for error
	likeResult, err := h.questionservice.FindMyLike(ctx, discoveryQuestionLikesCollection, myLikeFilter)

	//check for error excluding not found error
	if err != nil && err.Error() != mongo.ErrNoDocuments.Error() {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	//if like not found create new like
	if err != nil && err.Error() == mongo.ErrNoDocuments.Error() {
		println("like not found")
		//create new like object
		newLike := h.questionservice.NewLikeDiscoveryQuestion(question.ID, user.ID, like.Liked)

		//insert like to database and check for error
		_, err = discoveryQuestionLikesCollection.InsertOne(ctx, newLike)

		if err != nil {
			http.Error(w, "internal error", http.StatusInternalServerError)
			return
		}

	} else {

		//get Like model from like result
		likeModel, err := h.questionservice.MyLikeModel(likeResult)

		if err != nil {
			http.Error(w, "internal error", http.StatusInternalServerError)
			return
		}

		if likeModel.Liked == like.Liked {
			http.Error(w, "invalid request", http.StatusConflict)
			return
		}

		//update like to database and check for error
		updatedLike := h.questionservice.UpdateLike(like.Liked)

		updateFilter := h.questionservice.FilterById(likeModel.ID)

		_, err = discoveryQuestionLikesCollection.UpdateOne(ctx, updateFilter, updatedLike)

		if err != nil {
			http.Error(w, "internal error", http.StatusInternalServerError)
			return

		}

	}

	//send success message to client
	questionFilter := h.questionservice.FilterById(question.ID)

	updatedQuestion := discoveryQuestionCollection.FindOne(ctx, questionFilter)

	updatedQuestionModel, err := h.questionservice.GetDiscoveryQuestionModel(updatedQuestion)

	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	updatedQuestionDto, err := h.questionservice.GetModelTODto(ctx, updatedQuestionModel, db)

	if err != nil {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return

	}

	err = h.utils.WriteJSON(w, http.StatusOK, updatedQuestionDto, "data")

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

	questionCollection := db.Collection(h.questionservice.DiscoveryQuestionCollection())

	question.Question = newQUestion.Question
	question.Categories = append(question.Categories, categories...)
	question.Industries = append(question.Industries, industries...)
	question.Author = user.ID

	//save question to database and check for error
	_, err = h.questionservice.NewDiscoveryQuestion(ctx, questionCollection, question)

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
