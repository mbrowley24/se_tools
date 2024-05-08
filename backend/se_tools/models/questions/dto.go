package questions

import (
	"errors"
	"regexp"
	"time"
)

type DTO struct {
	ID          string    `json:"id,omitempty"`
	Question    string    `json:"question,omitempty"`
	Author      string    `json:"author,omitempty"`
	Updated     time.Time `json:"updated,omitempty"`
	Order       int       `json:"order,omitempty"`
	InTemplated bool      `json:"in_template,"`
	MyVote      bool      `json:"my_vote,omitempty"`
	Voted       bool      `json:"voted,omitempty"`
	VoteUP      int64     `json:"vote_up,omitempty"`
	VoteDown    int64     `json:"vote_down,omitempty"`
}

func (q *DTO) ValidateQuestion(notes string) bool {

	match := regexp.MustCompile(`^[a-zA-Z0-9 :?\/{}\+\-&%$#@!)(;',_+."]{0,500}$`)

	return match.MatchString(notes)
}

func (q *DTO) Validate() error {

	if q.ValidateQuestion(q.Question) {

		return nil
	}

	return errors.New("invalid question")
}
