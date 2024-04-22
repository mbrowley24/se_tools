package routes

import (
	"net/http"
	login "se_tools/handlers/Login"
	"se_tools/handlers/dashboard"
	"se_tools/handlers/questionHandlers"
)

type Routes struct {
	DashboardHandlders         dashboard.Handler
	DiscoveryQuestionsHandlers questionHandlers.Handler
	UserHandlers               login.Login
}

func (r Routes) enableCors(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		next.ServeHTTP(w, r)
	})
}

func (rte Routes) Routes() http.Handler {
	//create mux
	mux := http.NewServeMux()

	println("Routes")
	//Login functions
	mux.HandleFunc("/api/v1/login", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {

		case http.MethodPost:
			println("POST login")
			rte.UserHandlers.Login(w, r)

		case http.MethodOptions:
			println("OPTIONS login")

			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.WriteHeader(http.StatusOK)

		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	mux.HandleFunc("/api/v1/dashboard", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {

		case http.MethodGet:
			rte.DashboardHandlders.GetDashboard(w, r)
		case http.MethodOptions:

			println("OPTIONS login")

			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
			w.Header().Set("Access-Control-Allow-Methods", "GET")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.WriteHeader(http.StatusOK)
		}
	})

	mux.HandleFunc("/api/v1/questions", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {

		case http.MethodGet:
			rte.DiscoveryQuestionsHandlers.GetQuestions(w, r)

		case http.MethodOptions:
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
			w.Header().Set("Access-Control-Allow-Methods", "GET")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.WriteHeader(http.StatusOK)

		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}

	})

	//cors
	return rte.enableCors(mux)
}
