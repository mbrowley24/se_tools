package utils

import (
	"bufio"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"strconv"
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

// ToDo Write my own .env functionalility for full control easy to implement
// Env get env variables
func (u *Utilities) Env() error {

	file, err := os.Open(".env")

	if err != nil {
		println("Error loading .env file in functions")
		return err
	}

	fileScanner := bufio.NewScanner(file)

	for fileScanner.Scan() {

		line := fileScanner.Text()

		fmt.Println(line)
	}

	return nil
}

func (u *Utilities) ErrorJSON(w http.ResponseWriter, err error) {

	if err = u.WriteJSON(w, http.StatusBadRequest, err, "error"); err != nil {
		//ToDo do something with this error
	}
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

	if err := u.WriteJSON(w, http.StatusForbidden, "unauthorized", "error"); err != nil {
		//ToDo do something with this error
	}
}

func (u *Utilities) PageData(r *http.Request) (int64, int64, int64) {

	page := int64(0)
	limit := int64(10)

	values := r.URL.Query()

	if values.Get("page") != "" {
		pageValue := values.Get("page")

		value, err := strconv.Atoi(pageValue)

		if err != nil {

			//ToDO do something with this error
			println("Error converting string to int")

		} else {

			page = int64(value)
		}
	}

	if values.Get("limit") != "" {
		limitValue := values.Get("limit")

		value, err := strconv.Atoi(limitValue)

		if err != nil {

			//ToDo do something with this error
			println("Error converting string to int")

		} else {

			limit = int64(value)
		}

	}

	return page, limit, page * limit

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
