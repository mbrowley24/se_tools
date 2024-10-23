package appointmentsHandler

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/appointment"
	"se_tools/internals/models/appointmentType"
	optionsdto "se_tools/internals/models/optionsDto"
	"se_tools/internals/models/products"
	"strconv"
)

func (h *Handler) getAppointmentHandlers(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	//Get URL params for page and limit (skip)
	limitQuery := r.URL.Query().Get("limit")
	pageQuery := r.URL.Query().Get("page")

	limit, err := strconv.Atoi(limitQuery)

	if err != nil {
		limit = 10
	}

	page, err := strconv.Atoi(pageQuery)

	if err != nil {
		page = 0
	}

	//query set up
	var aptModels []appointment.Model
	opts := options.Find().SetLimit(int64(limit)).SetSkip(int64(page))

	filter := bson.M{}

	results, err := h.services.AppointmentService.GetAppointments(ctx, filter, opts)

	if err != nil {

		if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", ""); err != nil {
			return
		}
	}

	if err = results.All(ctx, &aptModels); err != nil {

		if err = h.utils.WriteJSON(w, http.StatusInternalServerError, "", ""); err != nil {
			return
		}
	}

}

func (h *Handler) getNewAppointmentHandler(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	var aptTypeModels []appointmentType.Model
	var aptOptions []optionsdto.Option
	var userModel appUser.User
	var productModels []products.Model
	var productOptions []optionsdto.Option

	contextMap := r.Context().Value(h.middleware.ContextKey).(map[string]string)

	userObjId, err := primitive.ObjectIDFromHex(contextMap["user_id"])

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	filter := bson.M{"_id": userObjId}

	if err := h.services.UserService.FindUser(ctx, filter, nil).Decode(&userModel); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	opts := options.Find().SetSort(bson.M{"name": 1})

	productResult, err := h.services.ProductService.Find(ctx, bson.M{}, opts)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if err := productResult.All(ctx, &productModels); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	aptTypeResult, err := h.services.AppointmentTypeService.Find(ctx, bson.M{}, opts)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if err := aptTypeResult.All(ctx, &aptTypeModels); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	for _, aptModel := range aptTypeModels {

		aptOptions = append(aptOptions, optionsdto.Option{
			Value: aptModel.PublicId,
			Name:  aptModel.Name,
		})
	}

	for _, prodModel := range productModels {
		productOptions = append(productOptions, optionsdto.Option{
			Value: prodModel.PublicId,
			Name:  prodModel.Name,
		})
	}

	formMap := make(map[string]interface{})
	formMap["csrf"] = userModel.CsrfToken
	formMap["products"] = productOptions
	formMap["types"] = aptTypeModels

	if err = h.utils.WriteJSON(w, http.StatusOK, formMap, "formData"); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

}
