package login

import (
	"context"
	"encoding/json"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"se_tools/internals/models/appUser"
)

func (l *Login) PostLoginHandler(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	var loginCredentials appUser.Credentials

	if err := json.NewDecoder(r.Body).Decode(&loginCredentials); err != nil {

		if err = l.utils.WriteJSON(w, http.StatusInternalServerError, "", ""); err != nil {
			return
		}
	}

	user, err := l.services.UserService.FindByUsername(ctx, loginCredentials.Username)

	if err != nil {
		if err = l.utils.WriteJSON(w, http.StatusInternalServerError, "", ""); err != nil {
			return
		}
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginCredentials.Password)); err != nil {

		if err = l.utils.WriteJSON(w, http.StatusUnauthorized, "", ""); err != nil {
			return
		}
	}

}
