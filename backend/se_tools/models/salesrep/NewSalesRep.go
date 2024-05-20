package salesrep

import (
	"errors"
	"regexp"
)

type NewSalesRep struct {
	FirstName string  `json:"first_name"`
	LastName  string  `json:"last_name"`
	Email     string  `json:"email"`
	Phone     string  `json:"phone"`
	Role      string  `json:"role"`
	Quota     float64 `json:"quota"`
}

func (n *NewSalesRep) Validate() error {
	namePattern := `^[a-zA-Z0-9]{3,75}$`
	phonePattern := `^[0-9]{10}$`
	emailPattern := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`

	nameRegex := regexp.MustCompile(namePattern)
	phoneRegex := regexp.MustCompile(phonePattern)
	emailRegex := regexp.MustCompile(emailPattern)

	if !nameRegex.MatchString(n.FirstName) {
		return errors.New("first name is invalid")
	}

	if !nameRegex.MatchString(n.LastName) {
		return errors.New("last name is invalid")
	}

	if !phoneRegex.MatchString(n.Phone) {
		return errors.New("phone number is invalid")
	}

	if !emailRegex.MatchString(n.Email) {
		return errors.New("email is invalid")
	}

	if n.Quota < 0 {
		return errors.New("quota is invalid")
	}

	return nil
}
