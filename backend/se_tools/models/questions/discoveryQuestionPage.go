package questions

import pagedata "se_tools/models/pageData"

type DiscoveryQuestionPage struct {
	PageInfo  pagedata.DTO `json:"pageInfo"`
	Questions []DTO        `json:"data"`
}
