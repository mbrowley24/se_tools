package salesrep

import "se_tools/utils"

type Form struct {
	ID        string `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
	Role      string `json:"role"`
	Quota     string `json:"quota"`
}

func (f *Form) Validate() error {

	var utility utils.Utilities

	if err := utility.NameCheck(f.FirstName); err != nil {
		return err
	}

	if err := utility.NameCheck(f.LastName); err != nil {
		return err
	}

	if err := utility.EmailValidation(f.Email); err != nil {
		return err
	}

	if err := utility.PhoneValidation(f.Phone); err != nil {
		return err
	}

	if err := utility.QuotaValidation(f.Quota); err != nil {
		return err
	}

	return nil
}
