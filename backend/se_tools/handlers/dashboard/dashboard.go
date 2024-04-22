package dashboard

import (
	"context"
	"errors"
	"net/http"
	ispservice "se_tools/services/ispService"
	"se_tools/utils"
	"time"
)

type Handler struct {
	ispservice ispservice.Service
	utils      utils.Utilities
}

func (h *Handler) GetDashboard(w http.ResponseWriter, r *http.Request) {

	ctx, cancel := context.WithTimeout(r.Context(), 30*time.Second)
	defer cancel()

	//get ISP DTOs and check for errors
	isps, err := h.ispservice.GetDashboardData(ctx)

	if err != nil {
		println(err.Error())
		println("Error getting ISP data")
		customError := errors.New("internal server error")
		h.utils.ErrorJSON(w, customError)
		return
	}

	//return ISP DTOs
	err = h.utils.WriteJSON(w, http.StatusOK, isps, "data")

	if err != nil {
		customError := errors.New("internal server error")
		h.utils.ErrorJSON(w, customError)
		return
	}

}
