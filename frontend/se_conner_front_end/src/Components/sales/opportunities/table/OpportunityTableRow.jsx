import React, {useEffect, useState, useReducer} from "react";
import OpportunityName from "./OpportunityName";
import OpportunityAmount from "./OpportunityAmount";
import OpportunityStatus from "./OpportunityStatus";
import OpportunityClose from "./OpportunityClose";
import OpportunityActions from "./OpportunityActions";
import useSalesRep from "../../../../hooks/useSalesRep";

function OpportunityTableRow({opportunity}){
    const [update, setUpdate] = useState(false);
    const {opportunityReducer, initialState, FIELDS} = useSalesRep();
    const [opportunityData, dispatchOpp] = useReducer(opportunityReducer, initialState);
    

    useEffect(()=>{
        
        dispatchOpp({type: FIELDS.UPDATE, payload: opportunity});

    },[opportunity])

    function inputChange(e){
        
    }

    

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
                close={opportunityData.close_date}
                update={update}
            />
            <td>{opportunity.sales_rep.name}</td>
            <td>{opportunityData.updated}</td>
            <OpportunityActions/>
        </tr>
    )
}
export default OpportunityTableRow;