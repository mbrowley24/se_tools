package salesopportunity

import (
	"errors"
	"regexp"
)

type New struct {
	// Name is the name of the sales opportunity
	Name string `json:"name"`
	// Amount is the amount of the sales opportunity
	Amount string `json:"amount"`
	// CloseDate is the date the sales opportunity is expected to close
	CloseDate string `json:"close_date"`
	// Description is the description of the sales opportunity
	Description string `json:"description"`
	// Status is the status of the sales opportunity
	Status string `json:"status"`
	// SalesRep is the sales representative assigned to the sales opportunity
	SalesRep string `json:"sales_rep"`
}

func (n *New) ValidateName() error {

	re := regexp.MustCompile(`^[a-zA-Z]{2,75}$`)

	if !re.MatchString(n.Name) {
		return errors.New("name is invalid")
	}

	return nil

}

func (n *New) ValidateCloseDate() error {

	re := regexp.MustCompile(`^[0-9]{4}-[0-9]{2}-[0-9]{2}$`)

	if !re.MatchString(n.CloseDate) {
		return errors.New("close date is invalid")
	}

	return nil
}

func (n *New) ValidateAmount() error {
	re := regexp.MustCompile(`^[0-9]{2,13}.[0-9]{2}$`)

	amount := n.Amount

	regex := regexp.MustCompile(",")

	n.Amount = regex.ReplaceAllString(amount, "")

	if !re.MatchString(n.Amount) {
		return errors.New("amount is invalid")
	}

	return nil
}

func (n *New) ValidateDescription() error {
	re := regexp.MustCompile(`^[a-zA-Z0-9."?()*&%$#@;'!"\/<>,:{}[\]+=_\\\- :&]{0,255}$`)

	if !re.MatchString(n.Description) {
		return errors.New("description is invalid")
	}

	return nil
}

func (n *New) Validate() error {
	err := n.ValidateName()

	if err != nil {
		return err
	}

	println(n.Amount)
	err = n.ValidateAmount()

	if err != nil {
		return err
	}

	err = n.ValidateCloseDate()

	if err != nil {
		return err
	}

	err = n.ValidateDescription()

	if err != nil {
		return err
	}

	return nil
}
