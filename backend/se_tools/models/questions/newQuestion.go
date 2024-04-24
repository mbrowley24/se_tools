package questions

import (
	"errors"
	"regexp"
)

type NewQuestion struct {
	Question   string   `json:"question"`
	Categories []string `json:"categories"`
	Industries []string `json:"industries"`
}

func (n *NewQuestion) ValidateQuestion() error {

	match := regexp.MustCompile(`^[a-zA-Z0-9 :?\/{}\+\-&%$#@!)(;',_+."]{0,500}$`)

	if match.MatchString(n.Question) {
		return nil
	}

	return errors.New("invalid question")
}
