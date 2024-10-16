package login

import (
	"context"
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"se_tools/internals/jwt"
	"se_tools/internals/models/appUser"
	"time"
)

func (l *Login) PostLoginHandler(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	var loginCredentials appUser.Credentials

	//gather login infos
	if err := json.NewDecoder(r.Body).Decode(&loginCredentials); err != nil {

		if err = l.utils.WriteJSON(w, http.StatusInternalServerError, "", ""); err != nil {
			return
		}
	}

	//check if user exists in Db
	user, err := l.services.UserService.FindByUsername(ctx, loginCredentials.Username)

	if err != nil {
		if err = l.utils.WriteJSON(w, http.StatusUnauthorized, "", ""); err != nil {
			return
		}
	}

	//check if passwords match
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginCredentials.Password)); err != nil {

		if err = l.utils.WriteJSON(w, http.StatusUnauthorized, "", ""); err != nil {
			return
		}
	}

	csrfToken := l.utils.RandomStringGenerator(90)

	claims := jwt.Claims{

		Subject:   user.PublicId,
		Issued:    time.Now(),
		NotBefore: time.Now(),
		Expires:   time.Now().Add(8 * time.Hour),
		Issuer:    "yeoman.net",
		Audiences: []string{"appointment"},
		CSRF:      csrfToken,
	}

	filter := bson.M{"_id": user.ID}

	update := bson.M{"$set": bson.M{
		"csrf_token": csrfToken,
	}}

	opt := options.UpdateOptions{}

	if _, err := l.services.UserService.UpdateUser(ctx, filter, update, opt); err != nil {
		if err = l.utils.WriteJSON(w, http.StatusInternalServerError, "", "error"); err != nil {
			return
		}
	}

	token, err := claims.GenerateJWT("./crypto/private.key")

	if err != nil {
		if err = l.utils.WriteJSON(w, http.StatusInternalServerError, "", ""); err != nil {
			return
		}
	}

	cookie := http.Cookie{}
	cookie.Name = "yeoman_token"
	cookie.Value = token
	cookie.Expires = time.Now().Add(8 * time.Hour)
	cookie.HttpOnly = true

	http.SetCookie(w, &cookie)

	if err = l.utils.WriteJSON(w, http.StatusOK, "", ""); err != nil {
		return
	}
}
