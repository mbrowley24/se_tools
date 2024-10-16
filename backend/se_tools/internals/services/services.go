package services

import (
	appointmentservice "se_tools/internals/services/appointmentService"
	"se_tools/internals/services/authoritiesService"
	"se_tools/internals/services/companyService"
	"se_tools/internals/services/industryService"
	"se_tools/internals/services/productService"
	roleservices "se_tools/internals/services/roleServices"
	salesrepservice "se_tools/internals/services/salesRepService"

	"se_tools/internals/services/salesroleservice"
	"se_tools/internals/services/userService"
)

type Services struct {
	AppointmentService *appointmentservice.AppointmentService
	AuthorityService   *authoritiesservice.Services
	CompanyService     *companyservice.Service
	IndustryService    *industryservice.Service
	LoginService       *userservice.LoginService
	ProductService     *productService.Service
	RoleService        *roleservices.Services
	SalesRepService    *salesrepservice.Service
	SalesRoleService   *salesroleservice.Service
	UserService        *userservice.Service
}
