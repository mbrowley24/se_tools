package middleware

import (
	"context"
	"errors"
	"se_tools/internals/jwt"
	"se_tools/utils"

	"net/http"
)

type UrlParams string

type Middleware struct {
	utils     utils.Utilities
	urlParams UrlParams
}

func (m *Middleware) CheckToken(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Vary", "Authorization")

		cookie, err := r.Cookie("yeoman cookie")

		if err != nil {

			err := errors.New("unauthorized")
			if err = m.utils.WriteJSON(w, http.StatusForbidden, err, "error"); err != nil {

				return
				//Todo handle this error
			}
			return
			//could set anonymous user
		}

		var jwtParser jwt.Claims

		token := cookie.Value

		if err := jwtParser.VerifyJWT(token); err != nil {
			err = errors.New("unauthorized")
			if err = m.utils.WriteJSON(w, http.StatusForbidden, err, "error"); err != nil {
				return
			}
		}

		claims, err := jwtParser.ParseJwt(token)

		if err != nil {
			err = errors.New("unauthorized")
			if err = m.utils.WriteJSON(w, http.StatusForbidden, err, "error"); err != nil {

			}
		}
		m.urlParams = "params"

		ctx := context.WithValue(r.Context(), m.urlParams, params)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
