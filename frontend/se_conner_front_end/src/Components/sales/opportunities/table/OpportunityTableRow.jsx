import React, {useEffect, useState} from "react";
import OpportunityName from "./OpportunityName";
import OpportunityAmount from "./OpportunityAmount";
import OpportunityStatus from "./OpportunityStatus";
import OpportunityClose from "./OpportunityClose";
import OpportunityActions from "./OpportunityActions";

function OpportunityTableRow({opportunity}){
    const [update, setUpdate] = useState(false);
    const [opportunityData, setOpportunityData] = useState({
        name: "",
        amount: 0,
        status: "",
        close: "",
        sales_rep: "",
        updated: ""
    });

    useEffect(()=>{
        
        setOpportunityData({
            name: opportunity.name,
            amount: opportunity.amount,
            status: opportunity.status,
            close: opportunity.close,
            sales_rep: opportunity.sales_rep,
            updated: opportunity.updated
        })

    },[opportunity])


    

    return(
        <tr>
            <OpportunityName
                name={opportunityData.name}
                update={update}
            />
            <OpportunityAmount
                amount={opportunityData.amount}
                update={update}
            />
            <OpportunityStatus
                status={opportunityData.status}
                update={update}
            />
            <OpportunityClose
                close={opportunityData.close}
                update={update}
            />
            <td>{opportunity.sales_rep}</td>
            <td>{opportunity.updated}</td>
            <OpportunityActions/>
        </tr>
    )
}
export default OpportunityTableRow;