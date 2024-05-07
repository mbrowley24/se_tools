package discoveryquestiontemplate

type TemplateData struct {
	ID        string                    `json:"id"`
	Name      string                    `json:"name"`
	Questions []TemplateQuestionSummary `json:"questions"`
}
