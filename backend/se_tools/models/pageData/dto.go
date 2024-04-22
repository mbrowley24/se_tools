package pagedata

import (
	"net/http"
	"strconv"
)

type DTO struct {
	Page   int64 `json:"page"`
	Limit  int64 `json:"limit"`
	Offset int64 `json:"offset"`
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
