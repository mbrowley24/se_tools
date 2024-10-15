package middleware

import (
	"context"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"se_tools/internals/jwt"
	"se_tools/internals/models/appUser"
	"se_tools/utils"
	"strings"
	"time"

	"net/http"
)

type UrlParams string

type Middleware struct {
	utils      *utils.Utilities
	collection *mongo.Collection
	urlParams  UrlParams
}

func Start(collection *mongo.Collection, utils *utils.Utilities, params string) *Middleware {

	return &Middleware{
		utils:      utils,
		collection: collection,
		urlParams:  UrlParams(params),
	}
}

func checkCookie(cookie *http.Cookie) error {

	if strings.Compare(cookie.Value, "yeoman_token") != 0 {

		return errors.New("cookie is not value")
	}

	if cookie.Expires.Before(time.Now()) {

		return errors.New("cookie expired")
	}

	return nil
}

func (m *Middleware) CheckToken(ctx context.Context, next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		//w.Header().Add("Vary", "Authorization")

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

		if err = checkCookie(cookie); err != nil {
			if err = m.utils.WriteJSON(w, http.StatusForbidden, err, "error"); err != nil {
				return
			}
		}

		var jwtParser jwt.Claims

		token := cookie.Value

		if err := jwtParser.ValidateJWT(token, "./crypto/public.key"); err != nil {

			err = errors.New("unauthorized")

			if err = m.utils.WriteJSON(w, http.StatusForbidden, err, "error"); err != nil {
				return
			}
		}

		if jwtParser.Issuer != "yeoman.net" {
			err := errors.New("unauthorized")
			if err = m.utils.WriteJSON(w, http.StatusForbidden, err, "error"); err != nil {
				return
			}
		}

		if jwtParser.NotBefore.After(time.Now()) {

			err := errors.New("unauthorized")
			if err = m.utils.WriteJSON(w, http.StatusForbidden, err, "error"); err != nil {
				return
			}
		}

		if jwtParser.Issued.After(time.Now()) {

			err := errors.New("unauthorized")
			if err = m.utils.WriteJSON(w, http.StatusForbidden, err, "error"); err != nil {
				return
			}
		}

		if jwtParser.Expires.Before(time.Now()) {
			err := errors.New("unauthorized")
			if err = m.utils.WriteJSON(w, http.StatusForbidden, err, "error"); err != nil {
				return
			}
		}

		isAudience := false
		for _, aud := range jwtParser.Audiences {

			if strings.Compare(aud, "appointment") == 0 {
				isAudience = true
				break
			}
		}

		if !isAudience {

			err := errors.New("unauthorized")
			if err = m.utils.WriteJSON(w, http.StatusForbidden, err, "error"); err != nil {
				return
			}
		}

		userObjId, err := primitive.ObjectIDFromHex(token)

		if err != nil {

			if err = m.utils.WriteJSON(w, http.StatusForbidden, err, "error"); err != nil {
				return
			}
		}

		var user appUser.User
		err = m.collection.FindOne(ctx, bson.M{"_id": userObjId}).Decode(&user)

		if err != nil {
			if err = m.utils.WriteJSON(w, http.StatusForbidden, err, "error"); err != nil {
				return
			}
		}

		if strings.Compare(user.CsrfToken, jwtParser.CSRF) != 0 {

			err = errors.New("unauthorized")
			if err = m.utils.WriteJSON(w, http.StatusForbidden, err, "error"); err != nil {
				return
			}
		}

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
