import React, {useEffect, useMemo, useState} from "react";
import useHttp from "../../../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import useSalesRep from "../../../../hooks/useSalesRep";
import useTextTransform from "../../../../hooks/useTextTransform";
import {salesRepActions} from "../../../../store/salesRep";

function OpportunitySalesRep({value, inputChange, isValid}){
    const {httpRequest} = useHttp();
    const {capitalizeName} = useTextTransform();
    const {FIELDS} = useSalesRep();
    const dispatch = useDispatch();
    const salesReps = useSelector(state=>state.salesRepData.reps);
    
    const valid = useMemo(()=>{
        const salesRepList = [...salesReps] 
        return salesRepList.filter(rep=>rep.value === value).length > 0
    }, [value])

    useEffect(()=>{    
        isValid(FIELDS.SALESREP, valid)
    }, [valid])


    useEffect(()=>{

        const configRequest={
            url: "api/v1/sales-reps/options",
            method: "GET"
        }

        function applyData(res){
            console.log(res)
            if(res.data){
                dispatch(salesRepActions.setReps(res.data))              
            }

        }


        (async()=>{
            await httpRequest(configRequest, applyData)
        })()

    },[])

    return(
        <div>
            <label>Sales Rep</label>
            <select name={FIELDS.SALESREP}
                value={value}
                onChange={(e)=>inputChange(e)}
            >
                <option value={""} >Select Sales Rep</option>
                {
                    salesReps.map((rep, index)=>{
                        return(
                            <option key={index}
                                value={rep.value}
                                >{capitalizeName(rep.name)}</option>
                        )
                    })
                }

            </select>
            <p className="error">{valid? "" : "Required"}</p>
        </div>
    )
}

export default OpportunitySalesRep;