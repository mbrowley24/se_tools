import React, {useMemo, useReducer} from "react";
import {useNavigate} from "react-router-dom";
import OpportunityName from "./OpportunityName";
import OpportunityAmount from "./OpportunityAmount";
import OpportunityClose from "./OpportunityClose";
import OpportunityStatus from "./OpportunityStatus";
import OpportunitySalesRep from "./OpportunitySalesRep";
import OpportunityDescription from "./OpportunityDescription";
import useOpportunity from "../../../../hooks/useOpportunity";
import useHttp from "../../../../hooks/useHttp";


function OpportunityForm({id, inputChange, opportunity}){
    const navigate = useNavigate();
    const {oppValidState, validateOpp, validOpportunityReducer} = useOpportunity();
    const [validOpp, dispatchValidOpp] = useReducer(validOpportunityReducer, oppValidState);
    const canSave = useMemo(()=>validateOpp(validOpp), [validOpp])
    const {httpRequest} = useHttp();
        

        function isValid(name, value){
            dispatchValidOpp({type: name, payload: value})
        }

        function submit(e){
            e.preventDefault();
            
            const configRequest = {
                method: "POST",
                url: "api/v1/opportunity",
                data: opportunity
            }

            function applyData(res){
                
                if(res.status === 200){
                    navigate("/sales/opportunities")
                }
            }

            (async()=>{
                await httpRequest(configRequest, applyData)
            })()
        }


        return(
            <form onSubmit={submit}>
                <OpportunityName 
                    value={opportunity.name} 
                    inputChange={inputChange}
                    isValid={isValid}
                    />
                <OpportunityAmount 
                    value={opportunity.amount} 
                    inputChange={inputChange}
                    isValid={isValid}
                    />
                <OpportunityClose
                    value={opportunity.close_date}
                    inputChange={inputChange}
                    isValid={isValid}
                />
                <OpportunityStatus
                    value={opportunity.status}
                    inputChange={inputChange}
                    isValid={isValid}
                />
                <OpportunitySalesRep
                    value={opportunity.sales_rep}
                    inputChange={inputChange}
                    isValid={isValid}
                />
                <OpportunityDescription
                    value={opportunity.description}
                    inputChange={inputChange}
                    isValid={isValid}
                />
                <div className="">
                    <button disabled={!canSave}>Create Opportunity</button>
                    <button onClick={()=>navigate(`/sales/companies/${id}`)}>Cancel</button>
                </div>
            </form>
        )
}


export default OpportunityForm;