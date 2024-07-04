import React, {useEffect} from "react";
import useHttp from "../../../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import useTextTransform from "../../../../hooks/useTextTransform";
import {salesRepActions} from "../../../../store/salesRep";

function OpportunitySalesRep({value, inputChange, FIELDS, errors, submit_errors, label}){

    const {httpRequest} = useHttp();
    const {capitalizeName} = useTextTransform();
    const dispatch = useDispatch();
    const salesReps = useSelector(state=>state.salesRepData.reps);
    


    useEffect(()=>{

        const configRequest={
            url: "api/v1/sales-reps/options",
            method: "GET"
        }

        function applyData(res){
            
            if(res.data){
                dispatch(salesRepActions.setReps(res.data))              
            }

        }


        (async()=>{
            await httpRequest(configRequest, applyData)
        })()

    },[])

    return(
        <>
            {label && <label>{label}</label>}
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
            <p className="error">{errors && errors.sales_rep? errors.sales_rep : ""}</p>
            <p className="error">{submit_errors && submit_errors.sales_rep? submit_errors.sales_rep : ""}</p>
        </>
    )
}

export default OpportunitySalesRep;