package appointment

import (
	"se_tools/internals/models/appUser"
	"se_tools/internals/models/company"
	optionsdto "se_tools/internals/models/optionsDto"
	"time"
)

type DTO struct {
	ID             string              `json:"id"`
	Name           string              `json:"name"`
	Company        company.DTO         `json:"company"`
	Description    string              `json:"description"`
	SalesRepId     string              `json:"salesRep"`
	Date           time.Time           `json:"date"`
	SalesEngineer  appUser.DTO         `json:"sales_engineer"`
	ConvertedToOpp bool                `json:"converted_to_opp"`
	Products       []optionsdto.Option `json:"products"`
	Notes          string              `json:"notes"`
	InPerson       bool                `json:"in_person"`
	Offset         string              `json:"offset"`
	UpdatedAt      time.Time           `json:"updated_at"`
}
