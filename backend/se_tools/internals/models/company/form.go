package company

import (
	"errors"
	"se_tools/utils"
)

type Form struct {
	Name     string `json:"name"`
	Industry string `json:"industry"`
	SalesRep string `json:"sales_rep"`
	Notes    string `json:"notes"`
	CSRF     string `json:"csrf"`
}

func (f *Form) Validate() error {

	var utility utils.Utilities

	if err := utility.CompanyNameCheck(f.Name); err != nil {
		return err
	}

	if err := utility.NotesDescription(f.Notes); err != nil {
		return err
	}

	if len(f.CSRF) > 0 {
		return errors.New("csrf is invalid")
	}

	if len(f.Industry) > 0 {
		return errors.New("industry required")
	}

	if len(f.SalesRep) > 0 {
		return errors.New("sales_rep required")
	}

	return nil
}
