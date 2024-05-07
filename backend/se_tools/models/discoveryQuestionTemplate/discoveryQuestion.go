package discoveryquestiontemplate

import "time"

type TemplateQuestionSummary struct {
	ID       string    `json:"id"`
	Question string    `json:"question"`
	Order    int64     `json:"order"`
	UpdateAt time.Time `json:"updated_at,omitempty"`
}
