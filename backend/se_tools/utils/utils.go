package utils

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"strings"
	"time"
)

type Utilities struct {
}

func (u *Utilities) Capitalize(s string) string {

	if len(s) == 0 {
		return s
	}
	return strings.ToUpper(s[:1]) + s[1:]
}

func (u *Utilities) DateFormat() string {

	return "2006-01-02"
}

func (u *Utilities) WriteJSON(w http.ResponseWriter, status int, data interface{}, wrap string) error {
	wrapper := make(map[string]interface{})

	wrapper[wrap] = data

	js, err := json.Marshal(wrapper)

	if err != nil {
		return nil
	}

	w.Header().Set("content-type", "application/json")
	w.WriteHeader(status)
	if _, err = w.Write(js); err != nil {
		//ToDo do something with this error
	}

	return nil
}

func (u *Utilities) ErrorJSON(w http.ResponseWriter, err error) {

	if err = u.WriteJSON(w, http.StatusBadRequest, err, "error"); err != nil {
		//ToDo do something with this error
	}
}

// RandomStringGenerator generate random strings
func (u *Utilities) RandomStringGenerator(length int) string {

	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

	var seededRand *rand.Rand = rand.New(rand.NewSource(time.Now().UnixNano()))
	b := make([]byte, length)

	for i := range b {

		b[i] = charset[seededRand.Intn(len(charset))]
	}

	return string(b)
}
