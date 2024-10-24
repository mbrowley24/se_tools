package internals

import (
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	login "se_tools/internals/handlers/Login"
	"se_tools/internals/handlers/appointmentsHandler"
	companyhandler "se_tools/internals/handlers/companyHandler"
	"se_tools/internals/handlers/industryHandler"
	salesopportunityhandlers "se_tools/internals/handlers/salesOpportunityHandlers"
	salesrolehandlers "se_tools/internals/handlers/salesRoleHandlers"
	"se_tools/internals/handlers/salesrephandler"
	"se_tools/internals/handlers/userHandlers"
	"se_tools/internals/middleware"
	"se_tools/internals/repository"
	"se_tools/internals/services"
	"se_tools/internals/services/appointmentService"
	appointmenttypeservice "se_tools/internals/services/appointmentTypeService"
	authoritiesservice "se_tools/internals/services/authoritiesService"
	companyservice "se_tools/internals/services/companyService"
	industryservice "se_tools/internals/services/industryService"
	productservice "se_tools/internals/services/productService"
	roleservices "se_tools/internals/services/roleServices"
	salesrepservice "se_tools/internals/services/salesRepService"
	"se_tools/internals/services/salesroleservice"
	timezoneservice "se_tools/internals/services/timezoneService"
	userservice "se_tools/internals/services/userService"
	"se_tools/utils"
)

type Internals struct {
	Handler http.Handler
}

func (i *Internals) enableCors(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		//preflight checks
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func (i *Internals) ApplicationSetup(client *mongo.Client) {

	//route multiplexer
	mux := http.NewServeMux()

	//application utility functions
	appUtils := utils.Utilities{}

	//Struct for dependency injection to other parts of the application
	appointmentRepo := repository.AppointmentRepository{
		Client:   client,
		Database: client.Database("appointments"),
	}

	//individual applications services
	appointmentService := appointmentservice.New(appointmentRepo.AppointmentCollection(), &appUtils)
	appointmentTypeService := appointmenttypeservice.Start(appointmentRepo.AppointmentTypesCollection(), &appUtils)
	appMiddleware := middleware.Start(appointmentRepo.UserCollection(), &appUtils, "params")
	authService := authoritiesservice.Start(appointmentRepo.Authorities(), &appUtils)
	companyServices := companyservice.Start(appointmentRepo.CompanyCollection(), &appUtils)
	industryServices := industryservice.Start(appointmentRepo.IndustryCollection(), &appUtils)
	loginService := userservice.Start(appointmentRepo.UserCollection(), &appUtils)
	productServices := productservice.Start(appointmentRepo.ProductsCollection(), &appUtils)
	roleServices := roleservices.Start(appointmentRepo.RolesCollection(), &appUtils)
	salesRepServices := salesrepservice.Start(appointmentRepo.SalesRepCollection(), &appUtils)
	salesRoleServices := salesroleservice.Start(appointmentRepo.SalesRolesCollection(), &appUtils)
	timezoneServices := timezoneservice.StartService(appointmentRepo.TimezoneCollection(), &appUtils)
	userService := userservice.StartService(appointmentRepo.UserCollection(), &appUtils)

	if err := appointmentTypeService.Initialize(); err != nil {
		panic(err)
	}
	if err := authService.Initialize(); err != nil {

		panic(err)
	}

	if err := industryServices.Initialize(); err != nil {
		panic(err)
	}

	if err := productServices.Initialize(); err != nil {
		panic(err)
	}

	if err := roleServices.Initialize(); err != nil {

		panic(err)
	}

	if err := timezoneServices.Initialize(); err != nil {

		panic(err)
	}

	authModels, err := authService.AdminAuths()

	if err != nil {
		panic(err)
	}

	if err := roleServices.AdminRoleAssignments(authModels); err != nil {

		panic(err)
	}

	if err := salesRoleServices.Initialize(); err != nil {
		panic(err)
	}

	role, err := roleServices.GetRoleByName("admin")

	if err != nil {
		panic(err)
	}

	if err := loginService.AdminUser(role); err != nil {

		panic(err)
	}

	//Struct for dependency injection services to other parts of the application
	appServices := services.Services{
		AppointmentService:     appointmentService,
		AppointmentTypeService: appointmentTypeService,
		AuthorityService:       authService,
		CompanyService:         companyServices,
		IndustryService:        industryServices,
		ProductService:         productServices,
		RoleService:            roleServices,
		SalesRoleService:       salesRoleServices,
		SalesRepService:        salesRepServices,
		UserService:            userService,
	}

	//define and register handlers
	appointmentsHandler.New(appMiddleware, mux, &appServices, &appUtils).RegisterHandlers()
	companyhandler.New(appMiddleware, &appServices, mux, &appUtils).RegisterHandler()
	industryHandler.New(appMiddleware, mux, &appServices, &appUtils).RegisterHandlers()
	login.New(mux, &appServices, &appUtils).RegisterHandlers()
	salesopportunityhandlers.New(mux, &appServices).RegisterHandlers()
	salesrephandler.New(appMiddleware, mux, &appServices, &appUtils).RegisterHandler()
	salesrolehandlers.New(appMiddleware, mux, &appServices, &appUtils).RegisterHandlers()
	userHandlers.Start(appMiddleware, mux, &appServices, &appUtils).RegisterHandlers()
	//Cors and check cookie and token
	i.Handler = i.enableCors(mux)
}
