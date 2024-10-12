package routes

import (
	"net/http"
	login "se_tools/handlers/Login"

	companyhandler "se_tools/handlers/companyHandler"

	salesopportunityhandlers "se_tools/handlers/salesOpportunityHandlers"
	salesrolehandlers "se_tools/handlers/salesRoleHandlers"
	"se_tools/handlers/salesrephandler"
)

type Routes struct {
	CompanyHandlers   companyhandler.Handler
	SalesOpp          salesopportunityhandlers.Handler
	SalesRepHandlers  salesrephandler.Handler
	SalesRoleHandlers salesrolehandlers.Handler
	UserHandlers      login.Login
}

func (r *Routes) enableCors(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		next.ServeHTTP(w, r)
	})
}

func (r *Routes) Routes() http.Handler {

	//create mux
	mux := http.NewServeMux()

	//Login functions
	mux.HandleFunc("/api/v1/login", r.UserHandlers.LoginHandler)

	mux.HandleFunc("/api/v1/sales/reps", r.SalesRepHandlers.SalesReps)

	mux.HandleFunc("/api/v1/sales/reps/{id}", r.SalesRepHandlers.OneSalesRep)

	mux.HandleFunc("/api/v1/sales/reps/options", r.SalesRepHandlers.SalesRepOptions)

	mux.HandleFunc("/api/v1/sales/reps/email/{email}", r.SalesRepHandlers.CheckEmail)

	mux.HandleFunc("/api/v1/sales/roles", r.SalesRoleHandlers.SalesRoles)

	mux.HandleFunc("/api/v1/sales/companies", r.CompanyHandlers.GetCompanies)

	mux.HandleFunc("/api/v1/opportunity", r.CompanyHandlers.GetCompanies)
	//cors
	return r.enableCors(mux)
}
