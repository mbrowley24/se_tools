package salesrolehandlers

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"se_tools/internals/models/optionsDto"
	"se_tools/internals/models/salesroles"
)

func (h *Handler) getSalesRoles(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	opts := options.Find().SetSort(bson.M{"name": 1})

	var models []salesroles.Model
	results, err := h.service.SalesRoleService.GetRoles(ctx, bson.M{}, opts)
	if err != nil {

		if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	if err := results.All(ctx, &models); err != nil {
		if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	var roleOpts []optionsdto.Option

	for _, m := range models {

		roleOpts = append(roleOpts, m.ModelToOption())
	}

	if err = h.utils.WriteJSON(w, http.StatusOK, roleOpts, "roles"); err != nil {
		return
	}
}
