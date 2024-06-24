import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { salesRepActions } from "../../../../store/salesRep";
import useTextTransform from "../../../../hooks/useTextTransform";
import useHttp from "../../../../hooks/useHttp";

function OpportunitySalesReps({inputChange, name, value}){
    const salesReps = useSelector(state => state.salesRepData.reps);
    const {capitalizeName} = useTextTransform();
    const dispatch = useDispatch();
    const {httpRequest} = useHttp();

    useEffect(()=>{

        
        if(salesReps.length > 0) return;

        const configRequest={
            url: 'api/v1/sales-reps',
            method: 'GET',
            responseType: 'json'
        }

        function applyData(res){
            
            if(res.status === 200){
                
                dispatch(salesRepActions.addReps(res.data));
                
            }
        }

        (async()=>{
            await httpRequest(configRequest, applyData)
        })()

    },[])
    
    return(
        
        <td>
            <select name={name}
                value={value}
                onChange={(e)=>inputChange(e)}   
            >
                <option value="">Choose Sales Rep</option>
                {
                    salesReps.map((rep)=>{
                        
                        return(
                            <option key={rep.id} value={rep.id}>{capitalizeName(`${rep.last_name}, ${rep.first_name}`)}</option>
                        )
                    })
                }
            </select>
        </td>
    )
}

export default OpportunitySalesReps;