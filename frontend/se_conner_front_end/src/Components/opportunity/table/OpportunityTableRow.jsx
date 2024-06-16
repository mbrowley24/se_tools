import React from "react";
import OpportunityName from "./OpportunityName";
import OpportunityCloseDate from "./OpportunityCloseDate";
import OpportunityDescription from "./OpportunityDescription";
import OpportunityStatus from "../../sales/opportunities/table/OpportunityStatus";
import OpportunityValue from "../../sales/opportunities/table/OpportunityValue";

function OpportunityTableRow({data}){
    return(
        <tr>
            <OpportunityName name="name" value={data.name} inputChange={item.inputChange}/>
            <OpportunityValue value={data.value}/>
            <OpportunityStatus status={data.status}/>
            <OpportunityDescription description={data.description}/>
            <OpportunityCloseDate closeDate={data.closeDate}/>
        </tr>
    )
}
export default OpportunityTableRow;