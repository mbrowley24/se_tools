package pagedata

import (
	"net/http"
	"strconv"
)

type DTO struct {
	Page       int64 `json:"page"`
	Limit      int64 `json:"limit"`
	Offset     int64 `json:"offset"`
	TotalItems int64 `json:"totalItems"`
	TotalPages int64 `json:"totalPages"`
	IsFirst    bool  `json:"isFirst"`
	HasNext    bool  `json:"hasNext"`
	HasPrev    bool  `json:"hasPrev"`
	IsLast     bool  `json:"isLast"`
}

func (d *DTO) GeneratePageData(r *http.Request) error {

	d.Page = 0
	d.Limit = 10

	values := r.URL.Query()

	if values.Get("page") != "" {

		pageValue := values.Get("page")

		value, err := strconv.Atoi(pageValue)

		if err != nil {
			println("Error converting string to int")

		} else {

			d.Page = int64(value)
		}
	}

	if values.Get("limit") != "" {

		limitValue := values.Get("limit")

		value, err := strconv.Atoi(limitValue)

		if err != nil {

			println("Error converting string to int")

		} else {

			d.Limit = int64(value)
		}

	}

	d.Offset = (d.Page * d.Limit)

	return nil
}

func (d *DTO) CalculatePageData(totalItems int64) {

	d.TotalItems = totalItems
	d.TotalPages = d.TotalItems / d.Limit

	if d.TotalItems%d.Limit != 0 {
		d.TotalPages++
	}

	d.IsFirst = d.Page == 0
	d.IsLast = d.Page == d.TotalPages
	d.HasNext = d.Page < d.TotalPages
	d.HasPrev = !d.IsFirst
}
