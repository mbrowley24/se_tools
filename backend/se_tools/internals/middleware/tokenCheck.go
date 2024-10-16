package middleware

import (
	"context"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"se_tools/internals/jwt"
	"se_tools/internals/models/appUser"
	"se_tools/utils"
	"strings"
	"time"

	"net/http"
)

type contextKey string

type Middleware struct {
	utils      *utils.Utilities
	collection *mongo.Collection
	contextKey contextKey
}

func Start(collection *mongo.Collection, utils *utils.Utilities, params string) *Middleware {

	return &Middleware{
		utils:      utils,
		collection: collection,
		contextKey: contextKey(params),
	}
}

func checkCookie(cookie *http.Cookie) error {

	if strings.Compare(cookie.Name, "yeoman_token") != 0 {

		return errors.New("cookie is not value")
	}

	if cookie.Expires.After(time.Now()) {

		return errors.New("cookie expired")
	}

	return nil
}

func (m *Middleware) CheckToken(next http.HandlerFunc) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		//w.Header().Add("Vary", "Authorization")

		ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
		defer cancel()

		cookie, err := r.Cookie("yeoman_token")

		if err != nil {

			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		if err = checkCookie(cookie); err != nil {

			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		var jwtParser jwt.Claims

		token := cookie.Value

		if err := jwtParser.ValidateJWT(token, "./crypto/public.key"); err != nil {

			err = errors.New("unauthorized")

			w.WriteHeader(http.StatusUnauthorized)

			return
		}

		if jwtParser.Issuer != "yeoman.net" {

			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		if jwtParser.NotBefore.After(time.Now()) {

			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		if jwtParser.Issued.After(time.Now()) {

			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		if jwtParser.Expires.Before(time.Now()) {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		isAudience := false
		for _, aud := range jwtParser.Audiences {

			if strings.Compare(aud, "appointment") == 0 {
				isAudience = true
				break
			}
		}

		if !isAudience {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		var user appUser.User
		err = m.collection.FindOne(ctx, bson.M{"public_id": jwtParser.Subject}).Decode(&user)

		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		if strings.Compare(user.CsrfToken, jwtParser.CSRF) != 0 {

			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		contextMap := make(map[string]interface{})
		contextMap["user_id"] = user.ID.Hex()
		contextMap["time_zone"] = user.Offset

		contextWithValue := context.WithValue(r.Context(), m.contextKey, contextMap)

		next(w, r.WithContext(contextWithValue))
	}
}
