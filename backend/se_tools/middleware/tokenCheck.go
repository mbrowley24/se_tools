package middleware

import (
	"context"
	"errors"
	"log"
	"se_tools/utils"

	"net/http"
	"os"
	"strings"
	"time"

	"github.com/pascaldekloe/jwt"
)

type UrlParams string

type Middleware struct {
	utils     utils.Utilities
	urlParams UrlParams
}

func (m *Middleware) CheckToken(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Vary", "Authorization")

		authHeader := r.Header.Get("Authorization")

		if authHeader == "" {

			err := errors.New("unauthoried")
			m.utils.WriteJSON(w, http.StatusForbidden, err, "error")
			return
			//could set anonymous user
		}

		//need to add bearer to token
		//split header from Breaer and token
		headParts := strings.Split(authHeader, " ")

		//check for 2 parts in header parts
		if len(headParts) != 2 {

			err := errors.New("unauthoried")
			m.utils.WriteJSON(w, http.StatusForbidden, err, "error")

			return
		}

		//check token header
		if headParts[0] != "Bearer" {

			err := errors.New("unauthoried")
			m.utils.WriteJSON(w, http.StatusForbidden, err, "error")

			return
		}

		//token from jwt
		token := headParts[1]

		//get secret key from env
		jwtSecret := os.Getenv("JWT_SECRET")

		//HMAC check against srect
		claims, err := jwt.HMACCheck([]byte(token), []byte(jwtSecret))

		//check for HMAC check error
		if err != nil {

			err := errors.New("unauthoried")
			m.utils.WriteJSON(w, http.StatusForbidden, err, "error")
			return
		}

		//check if token is valid now
		if !claims.Valid(time.Now()) {

			log.Println(claims.Expires)

			err := errors.New("unauthoried")
			m.utils.WriteJSON(w, http.StatusForbidden, err, "error")
			return
		}

		//check token is alowed to be accepted
		if !claims.AcceptAudience("mydomain.com") {

			err := errors.New("unauthoried")
			m.utils.WriteJSON(w, http.StatusForbidden, err, "error")
			return
		}

		//check claims issuer
		if claims.Issuer != "mydomain.com" {

			err := errors.New("unauthoried")
			m.utils.WriteJSON(w, http.StatusForbidden, err, "error")
			return
		}

		//url params key
		m.urlParams = "params"

		//get params
		params := r.Context().Value(m.urlParams).(map[string]string)

		//get ownerId from JWT
		ownerId := claims.Subject

		//log.Println(ownerId)
		//url params map
		params["ownerId"] = ownerId

		ctx := context.WithValue(r.Context(), m.urlParams, params)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
