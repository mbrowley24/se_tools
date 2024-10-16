package appointmentsHandler

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"se_tools/internals/models/appointment"
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

	//Convert appointment models to DTo for front-end
	var appointmentDTOs []appointment.DTO

	for _, aptModel := range aptModels {

		appointmentDTOs = append(appointmentDTOs, aptModel.ModelToDTO())
	}

	if err = h.utils.WriteJSON(w, http.StatusOK, appointmentDTOs, "aptDatas"); err != nil {
		return
	}

}
