package utils

import (
	"encoding/json"
	"errors"
	"math/rand"
	"net/http"
	"regexp"
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

func (u *Utilities) CheckCSRF(csrf string) error {

	if len(csrf) == 0 {
		return errors.New("csrf required")
	}

	return nil
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

func (u *Utilities) EmailValidation(email string) error {

	re := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	if !re.MatchString(email) {

		return errors.New("invalid email address")
	}

	return nil
}

func (u *Utilities) ErrorJSON(w http.ResponseWriter, err error) {

	if err = u.WriteJSON(w, http.StatusBadRequest, err, "error"); err != nil {
		//ToDo do something with this error
	}
}

func (u *Utilities) NotesDescription(text string) error {
	re := regexp.MustCompile(`^[a-zA-Z0-9\s.,!?%&@'"\-:;/]{0,500}$`)

	if !re.MatchString(text) {
		return errors.New("invalid text")
	}

	return nil
}

func (u *Utilities) NameCheck(name string) error {

	re := regexp.MustCompile(`^[a-zA-Z0-9.\\\s\-]{2,75}$`)

	if !re.MatchString(name) {
		return errors.New("invalid name")
	}

	return nil
}

func (u *Utilities) CompanyNameCheck(name string) error {

	re := regexp.MustCompile(`^[a-zA-Z0-9.\\\s\-&]{2,75}$`)

	if !re.MatchString(name) {
		return errors.New("invalid name")
	}

	return nil
}

func (u *Utilities) PhoneValidation(phone string) error {
	re := regexp.MustCompile(`^[0-9]{0,10}$`)

	if !re.MatchString(phone) {
		return errors.New("invalid phone")
	}

	return nil
}

func (u *Utilities) QuotaValidation(quota string) error {

	re := regexp.MustCompile(`^[0-9]{0,15}$`)

	if !re.MatchString(quota) {
		return errors.New("invalid quota")
	}

	return nil
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
