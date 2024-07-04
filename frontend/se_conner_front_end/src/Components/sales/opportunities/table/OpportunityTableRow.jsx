import React, {useEffect, useMemo, useReducer} from "react";
import { Link } from "react-router-dom";
import OpportunityName from "./OpportunityName";
import OpportunityAmount from "./OpportunityAmount";
import OpportunityStatus from "./OpportunityStatus";
import OpportunityClose from "./OpportunityClose";
import OpportunityActions from "./OpportunityActions";
import useOpportunity from "../../../../hooks/useOpportunity";
import OpportunitySalesReps from "./OpportunitySalesReps";

function OpportunityTableRow({opportunity}){
    console.log(opportunity);
    const {checkForErrors, checkForUpdate, opportunityReducer, initialState, FIELDS} = useOpportunity();
    const [opportunityData, dispatchOpp] = useReducer(opportunityReducer, initialState);
    const update = useMemo(()=>checkForUpdate(opportunity, opportunityData), [opportunity, opportunityData]);
    const errors = useMemo(()=>checkForErrors(opportunityData), [opportunityData]);

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
                error={errors['name']}
            />
            <OpportunityAmount
                name={FIELDS.VALUE}
                value={opportunityData.value}
                update={update}
                inputChange={inputChange}
                error={errors['value']}
            />
            <OpportunityStatus
                name={FIELDS.STATUS}
                value={opportunityData.status}
                update={update}
                inputChange={inputChange}
                error={errors['status']}
            />
            <OpportunityClose
                name={FIELDS.CLOSE}
                value={opportunityData.close_date}
                update={update}
                inputChange={inputChange}
                error={errors['close']}
            />
            <OpportunitySalesReps
                name={FIELDS.SALESREP} 
                value={opportunityData.sales_rep}
                inputChange={inputChange}
                error={errors['sales_rep']}
                />
            <td><Link to={`/sales/products/${opportunity.id}`}>{opportunityData.products}</Link></td>
            <OpportunityActions update={update} 
                                opportunity={opportunityData}
                                reset={reset}
                                errors={errors}/>
        </tr>
    )
}
export default OpportunityTableRow;