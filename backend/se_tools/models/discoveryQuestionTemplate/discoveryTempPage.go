package discoveryquestiontemplate

import pagedata "se_tools/models/pageData"

type DiscoveryTempSummaryPage struct {
	PageInfo  pagedata.DTO `json:"pageInfo"`
	Summaries []Summary    `json:"data"`
}
