package questions

import (
	"errors"
	"regexp"
	"time"
)

type DTO struct {
	PublicId string    `json:"public_id,omitempty"`
	Question string    `json:"question"`
	Author   string    `json:"author,omitempty"`
	Created  time.Time `json:"created_at,omitempty"`
	MyVote   bool      `json:"my_vote,omitempty"`
	Voted    bool      `json:"voted,omitempty"`
	VoteUP   int       `json:"vote_up,omitempty"`
	VoteDown int       `json:"vote_down,omitempty"`
}

func (q *DTO) ValidateQuestion(notes string) bool {

	match := regexp.MustCompile(`^[a-zA-Z0-9,.?\-"\s\)\(:;&%$#@!*]{0,250}$`)

	return match.MatchString(notes)
}

func (q *DTO) Validate() error {

	if q.ValidateQuestion(q.Question) {

		return nil
	}

	return errors.New("invalid question")
}
