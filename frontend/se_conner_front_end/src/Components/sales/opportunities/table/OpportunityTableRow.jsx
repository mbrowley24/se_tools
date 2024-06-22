import React, {useEffect, useMemo, useReducer} from "react";
import OpportunityName from "./OpportunityName";
import OpportunityAmount from "./OpportunityAmount";
import OpportunityStatus from "./OpportunityStatus";
import OpportunityClose from "./OpportunityClose";
import OpportunityActions from "./OpportunityActions";
import useOpportunity from "../../../../hooks/useOpportunity";
import OpportunitySalesReps from "./OpportunitySalesReps";

function OpportunityTableRow({opportunity}){

    const {checkForUpdate, opportunityReducer, initialState, FIELDS} = useOpportunity();
    const [opportunityData, dispatchOpp] = useReducer(opportunityReducer, initialState);
    const update = useMemo(()=>checkForUpdate(opportunity, opportunityData), [opportunity, opportunityData]);

    function reset(){
        dispatchOpp({type: FIELDS.UPDATE, payload: opportunity});
    }

    useEffect(()=>{
        
        reset();

    },[opportunity])

    function inputChange(e){
        const {name, value} = e.target;
        dispatchOpp({type: name, payload: value});
    }

    
    

    return(
        <tr>
            <OpportunityName
                name={FIELDS.NAME}
                value={opportunityData.name}
                update={update}
                inputChange={inputChange}
            />
            <OpportunityAmount
                name={FIELDS.VALUE}
                value={opportunityData.value}
                update={update}
                inputChange={inputChange}
            />
            <OpportunityStatus
                name={FIELDS.STATUS}
                value={opportunityData.status}
                update={update}
                inputChange={inputChange}
            />
            <OpportunityClose
                name={FIELDS.CLOSE}
                value={opportunityData.close_date}
                update={update}
                inputChange={inputChange}
            />
            <OpportunitySalesReps
                name={FIELDS.SALESREP} 
                value={opportunityData.sales_rep}
                inputChange={inputChange}
                />
            <td>{opportunityData.updated}</td>
            <OpportunityActions update={update} opportunity={opportunityData} reset={reset}/>
        </tr>
    )
}
export default OpportunityTableRow;