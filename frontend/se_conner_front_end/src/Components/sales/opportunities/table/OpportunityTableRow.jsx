import React, {useEffect, useMemo, useReducer, useState} from "react";
import { Link } from "react-router-dom";
import OpportunityName from "./OpportunityName";
import OpportunityAmount from "./OpportunityAmount";
import OpportunityStatus from "./OpportunityStatus";
import OpportunityClose from "./OpportunityClose";
import OpportunityActions from "./OpportunityActions";
import useOpportunity from "../../../../hooks/useOpportunity";
import OpportunitySalesReps from "./OpportunitySalesReps";
import useTextTransform from "../../../../hooks/useTextTransform";

function OpportunityTableRow({opportunity}){
    const [edit, setEdit] = useState(false);
    const {capitialize} = useTextTransform();
    const {checkForErrors, checkForUpdate, opportunityReducer, initialState, FIELDS} = useOpportunity();
    const [opportunityData, dispatchOpp] = useReducer(opportunityReducer, initialState);
    const update = useMemo(()=>checkForUpdate(opportunity, opportunityData), [opportunity, opportunityData]);
    const errors = useMemo(()=>checkForErrors(opportunityData), [opportunityData]);

    function reset(){
        dispatchOpp({type: FIELDS.UPDATE, payload: opportunity});
        toogleEdit();
    }

    const toogleEdit = () => setEdit((prev)=>!prev);

    useEffect(()=>{
        
        dispatchOpp({type: FIELDS.UPDATE, payload: opportunity});

    },[opportunity])

    function inputChange(e){
        const {name, value} = e.target;
        dispatchOpp({type: name, payload: value});
    }

    


    return(
        <tr>
            <OpportunityName
                name={FIELDS.NAME}
                edit={edit}
                value={capitialize(opportunityData.name)}
                inputChange={inputChange}
                error={errors['name']}
            />
            <OpportunityAmount
                name={FIELDS.VALUE}
                value={opportunityData.value}
                edit={edit}
                inputChange={inputChange}
                error={errors['value']}
            />
            <OpportunityStatus
                    name={FIELDS.STATUS}
                    edit={edit}
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
                edit={edit} 
                value={opportunityData.sales_rep}
                inputChange={inputChange}
                error={errors['sales_rep']}
                />
            <td><Link to={`/sales/products/${opportunity.id}`}>{opportunityData.products}</Link></td>
            <td><Link to={`/sales/meetings/${opportunity.id}`}>{opportunityData.meetings}</Link></td>
            <OpportunityActions update={update}
                                toogleEdit={toogleEdit}
                                opportunity={opportunityData}
                                reset={reset}
                                edit={edit}
                                errors={errors}/>
        </tr>
    )
}
export default OpportunityTableRow;