package userHandlers

import (
	"context"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"se_tools/internals/models/appUser"
)

func (h *Handler) getCSRFToken(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	var userModel appUser.User
	contextMap := r.Context().Value(h.middleware.ContextKey).(map[string]string)

	userId, ok := contextMap["user_id"]

	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		println("marker3")
		return
	}

	userObj, err := primitive.ObjectIDFromHex(userId)

	if err != nil {
		println("marker2")
		w.WriteHeader(http.StatusBadRequest)
		return

	}

	userFilter := h.services.UserService.FilterId(userObj)
	if err := h.services.UserService.FindUser(ctx, userFilter, nil).Decode(&userModel); err != nil {
		println(err.Error())
		println("marker1")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if err := h.utils.WriteJSON(w, http.StatusOK, userModel.CsrfToken, "csrf"); err != nil {
		return
	}

}
