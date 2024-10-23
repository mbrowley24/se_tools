package company

import (
	"errors"
	"se_tools/utils"
	"strings"
)

type NewUpdated struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Industry string `json:"industry"`
	SalesRep string `json:"sales_rep"`
	Notes    string `json:"notes"`
}

func (n *NewUpdated) Validate(utils *utils.Utilities) error {

	name := strings.TrimSpace(n.Name)
	notes := strings.TrimSpace(n.Notes)

	if err := utils.NameCheck(name); err != nil {
		return errors.New("name:invalid name")
	}

	if err := utils.NotesDescription(notes); err != nil {
		return errors.New("notes:invalid text")
	}

	if len(n.Industry) == 0 {
		return errors.New("industry:no industry")
	}

	if len(n.SalesRep) == 0 {
		return errors.New("sales_rep:no sales rep")
	}

	return nil
}
