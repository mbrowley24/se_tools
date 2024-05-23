package company

import "time"

type Summary struct {
	ID            string    `json:"id"`
	Name          string    `json:"name"`
	Opportunities int       `json:"opportunities"`
	Contacts      int       `json:"contacts"`
	ValueWon      float64   `json:"won"`
	ValueLost     float64   `json:"lost"`
	OpenValue     float64   `json:"open"`
	Updated       time.Time `json:"updated"`
}
