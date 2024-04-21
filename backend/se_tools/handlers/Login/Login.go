package login

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"se_tools/models/appUser"
	userservice "se_tools/services/userService"
	"se_tools/utils"
	"time"
)

type Login struct {
	userservice userservice.UserService
	utils       utils.Utilities
}

func (l Login) Login(w http.ResponseWriter, r *http.Request) {

	//create context and defer cancel
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	//create userCreds
	var userCreds appUser.Credentials

	//decode request body
	err := json.NewDecoder(r.Body).Decode(&userCreds)

	//check for errors for decoding
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	println(userCreds.Username)
	//check if username exists if user not found return 403 error
	user, err := l.userservice.FindByUsername(ctx, userCreds.Username)

	if err != nil {
		println("cannot find user")
		println(err.Error())
		invalid := errors.New("invalid username/password")

		http.Error(w, invalid.Error(), http.StatusForbidden)
		return
	}

	//compare password for a match if not return 403 error
	err = l.userservice.ComparePassword(userCreds.Password, user.Password)

	if err != nil {
		println("passwords do not match")
		println(err.Error())
		invalid := errors.New("invalid username/password")

		http.Error(w, invalid.Error(), http.StatusForbidden)
		return
	}

	//generate token
	token, err := l.userservice.GenerateJWT(ctx, user)

	if err != nil {
		internalError := errors.New("internal server error")
		http.Error(w, internalError.Error(), http.StatusInternalServerError)
		return
	}

	//create and set cookie
	cookie, err := l.userservice.Cookie(token)

	if err != nil {
		internalError := errors.New("internal server error")
		http.Error(w, internalError.Error(), http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &cookie)

	err = l.utils.WriteJSON(w, http.StatusOK, "", "Login successful")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
