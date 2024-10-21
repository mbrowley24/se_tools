package userHandlers

import (
	"context"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"se_tools/internals/models/appUser"
)

func (h *Handler) getCSRFToken(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	var userModel appUser.User
	contextMap := ctx.Value("params").(map[string]string)

	userId, ok := contextMap["user_id"]

	if !ok {
		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", ""); err != nil {

			return
		}
	}

	userObj, err := primitive.ObjectIDFromHex(userId)

	if err != nil {
		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", ""); err != nil {
			return
		}
	}

	userFilter := h.services.UserService.FilterId(userObj)
	if err := h.services.UserService.FindUser(ctx, userFilter, nil).Decode(userModel); err != nil {
		if err := h.utils.WriteJSON(w, http.StatusInternalServerError, "", ""); err != nil {
			return
		}
	}

	if err := h.utils.WriteJSON(w, http.StatusOK, userModel.CsrfToken, "csrf"); err != nil {
		return
	}

}
