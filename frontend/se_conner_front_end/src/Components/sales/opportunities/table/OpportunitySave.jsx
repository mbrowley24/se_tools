import React from "react";
import useHttp from "../../../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { companyActions } from "../../../../store/company";
import { dispatch } from "d3";

function OpportunitySave({opportunity, errors}){
    const {httpRequest} = useHttp();
    const id = useSelector(state=>state.companyData.company.id);
    const dispatch = useDispatch();

    function save(e){
        e.preventDefault();
        
        const configRequest = {
            method: "PUT",
            url: `api/v1/opportunities/update`,
            data: opportunity
        }

        function applyData(res){
            
            if(res.status === 200){

                dispatch(companyActions.updateOpportunities(res.data));
            }
            
        }

        (async()=>{
            
            await httpRequest(configRequest, applyData);
        })()
    }

    return(
        <button className="save"
            onClick={(e)=>save(e)}
        >Save</button>
    )
};
export default OpportunitySave;