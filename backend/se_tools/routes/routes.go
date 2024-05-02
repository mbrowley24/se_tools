package routes

import (
	"net/http"
	login "se_tools/handlers/Login"
	categoryhandlers "se_tools/handlers/categoryHandlers"
	"se_tools/handlers/dashboard"
	"se_tools/handlers/industryhandler"
	"se_tools/handlers/questionHandlers"
	templatediscoveryhandlers "se_tools/handlers/templateDiscoveryHandlers"
)

type Routes struct {
	CategoryHandlers           categoryhandlers.Handler
	DashboardHandlders         dashboard.Handler
	DiscoveryQuestionsHandlers questionHandlers.Handler
	DiscoveryTemplateHandlers  templatediscoveryhandlers.Handler
	IndustryHandlers           industryhandler.Handler
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

	//dashboard functions
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

	//questions Routes
	mux.HandleFunc("/api/v1/questions", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {

		case http.MethodGet:
			rte.DiscoveryQuestionsHandlers.GetQuestions(w, r)

		case http.MethodPost:
			rte.DiscoveryQuestionsHandlers.NewQuestion(w, r)

		case http.MethodOptions:
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.WriteHeader(http.StatusOK)

		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}

	})

	mux.HandleFunc("/api/v1/questions/like", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {

		case http.MethodPost:
			rte.DiscoveryQuestionsHandlers.LikeQuestion(w, r)

		case http.MethodOptions:
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
			w.Header().Set("Access-Control-Allow-Methods", "POST")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.WriteHeader(http.StatusOK)

		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	mux.HandleFunc("/api/v1/questions/templates", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {

		case http.MethodPost:
			rte.DiscoveryTemplateHandlers.CreateTemplateDiscovery(w, r)

		case http.MethodGet:
			rte.DiscoveryTemplateHandlers.GetTemplateDiscoverySummary(w, r)

		case http.MethodOptions:
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
			w.Header().Set("Access-Control-Allow-Methods", "POST")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.WriteHeader(http.StatusOK)

		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)

		}
	})

	//industry Routes
	mux.HandleFunc("/api/v1/industry", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {

		case http.MethodGet:
			rte.IndustryHandlers.GetIndustries(w, r)

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

	//category Routes
	mux.HandleFunc("/api/v1/category", func(w http.ResponseWriter, r *http.Request) {

		switch r.Method {

		case http.MethodGet:
			rte.CategoryHandlers.GetCategories(w, r)

		case http.MethodOptions:
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
			w.Header().Set("Access-Control-Allow-Methods", "GET")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.WriteHeader(http.StatusOK)
		}
	})

	//cors
	return rte.enableCors(mux)
}
