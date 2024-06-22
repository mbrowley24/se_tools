import React, {useEffect, useState} from "react";
import useHttp from "../../../../hooks/useHttp";
import OpportunityTableHead from "./OpportunityTableHead";
import OpportunityTableBody from "./OpportunityTableBody";
import { companyActions } from "../../../../store/company";
import {useDispatch, useSelector} from "react-redux";

function OpportunityTable({data}){
    const {httpRequest} = useHttp();    
    const dispatch = useDispatch();
    const statuses = useSelector(state => state.companyData.opportunityStatus);


    useEffect(()=>{

        if(statuses.length > 0) return;

        const config ={
            url: "api/v1/opportunities/status",
            method: "GET",
        }

        function applyData(res){
            
            //console.log(res)
            if(res.status === 200){
                
                dispatch(companyActions.setOpporunitiesStatus(res.data));
            }
        }

        (async()=>{
            
            await httpRequest(config, applyData);
            
        })()

    },[])
    
    return(
        <table>
            <OpportunityTableHead/>
            <OpportunityTableBody opportunities={data}/>
        </table>
    )
}
export default OpportunityTable;