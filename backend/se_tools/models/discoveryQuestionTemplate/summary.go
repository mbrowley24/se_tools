package discoveryquestiontemplate

import "time"

type Summary struct {
	ID        string    `json:"id"` // This is the public_id
	Name      string    `json:"name"`
	Author    string    `json:"author"`
	Questions int       `json:"questions"`
	UpdateAt  time.Time `json:"updated_at,omitempty"`
}
