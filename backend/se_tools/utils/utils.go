package utils

import (
	"bufio"
	"encoding/json"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

type Utilities struct {
}

func (u *Utilities) Capitalize(s string) string {

	if len(s) == 0 {
		return s
	}
	return strings.ToUpper(s[:1]) + s[1:]
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
	w.Write(js)

	return nil
}

// get env variables
func (u Utilities) Env(text string) (string, error) {

	err := godotenv.Load(".env")

	if err != nil {
		println(err.Error())
		println("Error loading .env file in functions")
		return "", err
	}

	return os.Getenv(text), nil
}

func (u *Utilities) ErrorJSON(w http.ResponseWriter, err error) {

	u.WriteJSON(w, http.StatusBadRequest, err, "error")
}

// OpenFile open file
func (u *Utilities) OpenFile(filePath string) (*os.File, error) {

	file, err := os.Open(filePath)

	if err != nil {
		return nil, err
	}

	return file, nil

}

func (u *Utilities) OpenScanner(file *os.File) *bufio.Scanner {

	return bufio.NewScanner(file)
}

func (u *Utilities) Unauthorized(w http.ResponseWriter) {

	u.WriteJSON(w, http.StatusForbidden, "unauthorized", "error")
}

func (u *Utilities) PageData(r *http.Request) (int64, int64, int64) {

	page := int64(0)
	limit := int64(10)

	values := r.URL.Query()

	if values.Get("page") != "" {
		pageValue := values.Get("page")

		value, err := strconv.Atoi(pageValue)

		if err != nil {
			println("Error converting string to int")

		} else {

			page = int64(value)
		}
	}

	if values.Get("limit") != "" {
		limitValue := values.Get("limit")

		value, err := strconv.Atoi(limitValue)

		if err != nil {
			println("Error converting string to int")

		} else {

			limit = int64(value)
		}

	}

	return page, limit, (page * limit)

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
