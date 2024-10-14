package salesroles

type DTO struct {

	// PublicId is the public identifier of the sales role
	Id string `bson:"id"`
	// Name is the name of the sales role
	Name string `bson:"name"`
	// Description is the description of the sales role
	Description string `bson:"description"`
	// CreatedAt is the time the sales role was created
}
