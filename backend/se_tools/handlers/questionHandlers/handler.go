package questionHandlers

import (
	"context"
	"net/http"
	pagedata "se_tools/models/pageData"
	discoveryquestionservices "se_tools/services/discoveryQuestionServices"
	"se_tools/utils"
	"time"
)

type Handler struct {
	utils           utils.Utilities
	questionservice discoveryquestionservices.Service
}

func (h *Handler) GetQuestions(w http.ResponseWriter, r *http.Request) {

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	var pageData pagedata.DTO

	err := pageData.GeneratePageData(r)

	if err != nil {
		http.Error(w, "Error getting page data", http.StatusInternalServerError)
		return
	}

	//get questions from database
	questions, err := h.questionservice.GetQuestions(ctx, pageData)

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
