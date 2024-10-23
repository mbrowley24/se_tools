package company

type NewCompany struct {
	// PublicId is the public id of the account
	PublicId string `json:"public_id"`
	// Name is the name of the account
	Name string `json:"name"`
	//created by is the user who created the account
	CreatedAt string `json:"created_at"`
	// UpdatedAt is the date and time the account was last updated
	UpdatedAt string `json:"updated_at"`
}
