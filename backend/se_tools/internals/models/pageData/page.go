package pagedata

type Page struct {
	Page  DTO         `json:"page"`
	Items interface{} `json:"items"`
}
