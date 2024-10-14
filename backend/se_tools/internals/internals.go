package internals

import (
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	login "se_tools/internals/handlers/Login"
	companyhandler "se_tools/internals/handlers/companyHandler"
	salesopportunityhandlers "se_tools/internals/handlers/salesOpportunityHandlers"
	salesrolehandlers "se_tools/internals/handlers/salesRoleHandlers"
	"se_tools/internals/handlers/salesrephandler"
	"se_tools/internals/repository"
	"se_tools/internals/services"
	authoritiesservice "se_tools/internals/services/authoritiesService"
	companyservice "se_tools/internals/services/companyService"
	industryservice "se_tools/internals/services/industryService"
	productservice "se_tools/internals/services/productService"
	roleservices "se_tools/internals/services/roleServices"
	salesrepservice "se_tools/internals/services/salesRepService"
	"se_tools/internals/services/salesroleservice"
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
	authService := authoritiesservice.Start(appointmentRepo.Authorities(), &appUtils)
	companyServices := companyservice.Start(appointmentRepo.CompanyCollection(), &appUtils)
	industryServices := industryservice.Start(appointmentRepo.IndustryCollection(), &appUtils)
	productServices := productservice.Start(appointmentRepo.ProductsCollection(), &appUtils)
	roleServices := roleservices.Start(appointmentRepo.RolesCollection(), &appUtils)
	salesRepServices := salesrepservice.Start(appointmentRepo.SalesRolesCollection(), &appUtils)
	salesRoleServices := salesroleservice.Start(appointmentRepo.SalesRolesCollection(), &appUtils)

	//Struct for dependency injection services to other parts of the application
	appServices := services.Services{
		AuthorityService: authService,
		CompanyService:   companyServices,
		IndustryService:  industryServices,
		ProductService:   productServices,
		RoleService:      roleServices,
		SalesRoleService: salesRoleServices,
		SalesRepService:  salesRepServices,
	}

	//define and register handlers
	companyhandler.New(&appServices, mux).RegisterHandler()
	login.New(mux, &appServices).RegisterHandlers()
	salesopportunityhandlers.New(mux, &appServices).RegisterHandlers()
	salesrephandler.New(mux, &appServices).RegisterHandler()
	salesrolehandlers.New(mux, &appServices).RegisterHandlers()

	//Cors enable on mux
	i.Handler = i.enableCors(mux)
}
