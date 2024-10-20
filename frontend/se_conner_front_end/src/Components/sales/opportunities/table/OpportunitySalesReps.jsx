import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { salesRepActions } from "../../../../store/salesRep";
import useTextTransform from "../../../../hooks/useTextTransform";
import useHttp from "../../../../hooks/useHttp";

function OpportunitySalesReps({inputChange, name, value, edit}){
    const salesReps = useSelector(state => state.salesRepData.options);
    const {capitalizeName} = useTextTransform();
    const dispatch = useDispatch();
    const {httpRequest} = useHttp();

    useEffect(()=>{

        if(salesReps){

            if(salesReps.length > 0){
                return;
            }
        }

        const configRequest={
            url: 'api/v1/sales-reps/options',
            method: 'GET',
            responseType: 'json'
        }

        function applyData(res){
            
            if(res.status === 200){
                
                dispatch(salesRepActions.addOptions(res.data));
                
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
                disabled={!edit}
                onChange={(e)=>inputChange(e)}   
            >
                <option value="">Choose Sales Rep</option>
                {
                    salesReps.map((rep, index)=>{
                        
                        return( 
                            <option key={index} value={rep.value}>{capitalizeName(rep.name)}</option>
                        )
                    })
                }
            </select>
        </td>
    )
}

export default OpportunitySalesReps;