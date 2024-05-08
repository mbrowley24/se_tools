package discoveryquestiontemplate

import "se_tools/models/questions"

type TemplateData struct {
	ID        string          `json:"id"`
	Name      string          `json:"name"`
	Questions []questions.DTO `json:"questions"`
}
