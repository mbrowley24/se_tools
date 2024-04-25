package questions

import (
	"errors"
	"regexp"
	"time"
)

type DTO struct {
	ID       string    `json:"id,omitempty"`
	Question string    `json:"question"`
	Author   string    `json:"author,omitempty"`
	Created  time.Time `json:"created_at,omitempty"`
	MyVote   bool      `json:"my_vote"`
	Voted    bool      `json:"voted"`
	VoteUP   int64     `json:"vote_up"`
	VoteDown int64     `json:"vote_down"`
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
