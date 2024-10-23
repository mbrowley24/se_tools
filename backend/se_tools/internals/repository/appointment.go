package repository

import "go.mongodb.org/mongo-driver/mongo"

type AppointmentRepository struct {
	Client   *mongo.Client
	Database *mongo.Database
}

func (a *AppointmentRepository) Authorities() *mongo.Collection {

	return a.Database.Collection("authorities")
}

func (a *AppointmentRepository) AppointmentCollection() *mongo.Collection {

	return a.Database.Collection("appointments")
}

func (a *AppointmentRepository) AppointmentTypesCollection() *mongo.Collection {

	return a.Database.Collection("appointment_types")
}

func (a *AppointmentRepository) CompanyCollection() *mongo.Collection {
	return a.Database.Collection("companies")
}

func (a *AppointmentRepository) IndustryCollection() *mongo.Collection {
	return a.Database.Collection("industries")
}

func (a *AppointmentRepository) ProductsCollection() *mongo.Collection {

	return a.Database.Collection("products")
}

func (a *AppointmentRepository) RolesCollection() *mongo.Collection {

	return a.Database.Collection("roles")
}

func (a *AppointmentRepository) SalesRepCollection() *mongo.Collection {
	return a.Database.Collection("sales_reps")
}

func (a *AppointmentRepository) SalesRolesCollection() *mongo.Collection {
	return a.Database.Collection("sales_roles")
}

func (a *AppointmentRepository) TimezoneCollection() *mongo.Collection {
	return a.Database.Collection("timezones")
}

func (a *AppointmentRepository) UserCollection() *mongo.Collection {

	return a.Database.Collection("users")
}
