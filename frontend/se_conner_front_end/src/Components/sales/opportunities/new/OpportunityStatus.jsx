import React, {useEffect, useMemo, useState} from "react";
import useHttp from "../../../../hooks/useHttp";
import useSalesRep from "../../../../hooks/useSalesRep";
import {useDispatch,  useSelector } from "react-redux";
import { companyActions } from "../../../../store/company";

function OpportunityStatus({value, inputChange}){
    const statuses = useSelector(state => state.companyData.opportunityStatus);
    const {httpRequest} = useHttp();
    const {FIELDS} = useSalesRep();
    const dispatch = useDispatch();

    const valid = useMemo(()=>{
        const statusList = [...statuses]
        return statusList.filter(stat=>stat.value === value).length > 0; 
    }, [value])



    useEffect(()=>{

        if(statuses.length > 0) return;

        const configRequest={
            url: "api/v1/opportunities/status",
            method: "GET",
        }

        function applyData(res){
            
            if(res.status === 200){
                dispatch(companyActions.setStatuses(res.data));
            }
        }


        (async()=>{
            await httpRequest(configRequest, applyData)
        })()
    },[])


    return(
        <div>
            <label>Status</label>
            <select 
                    name={FIELDS.STATUS} 
                    onChange={inputChange}
                    >
                <option value="">Choose Status</option>
                {
                    statuses.map((stat, index)=>{
                        
                        return(
                            <option 
                                key={index}
                                value={stat.value}
                                >
                                {stat.name}
                            </option>
                        )
                    })
                }
            </select>
            <p className="error">{valid? "" : "Required"}</p>
        </div>
    )
}

export default OpportunityStatus;