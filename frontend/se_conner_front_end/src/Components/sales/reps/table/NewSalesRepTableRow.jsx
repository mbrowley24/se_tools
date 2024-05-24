import React, {useReducer, useState} from "react";
import { useNavigate } from "react-router-dom";
import NameCell from "./NameCell";
import useHttp from "../../../../hooks/useHttp";
import useSalesRep from "../../../../hooks/useSalesRep";
import "../../../../css/salesrep/newsalesrep.css"
import QuotaCell from "./QuotaCell";
import EmailCell from "./EmailCell";
import PhoneCell from "./PhoneCell";
import RoleCell from "./RoleCell";
import NewRepsCell from "./NewRepsCell";



function NewSalesRepTableRow({setReset}){
    const {assmblySalesRepReducer, salesRepInitialState, FIELDS, formatForBackend} = useSalesRep();
    const [salesRep, dispatchRep]  = useReducer(assmblySalesRepReducer, salesRepInitialState)
    const {httpRequest} = useHttp();
    
    const reset = () => dispatchRep({type: FIELDS.RESET, payload:{}})

    function inputChange(e){
        //break down the event object
        const {name, value} = e.target;
        
        dispatchRep({type: name, payload: value})

        console.log(salesRep)
        
    }

    async function submit(e){
        e.preventDefault();

        const paraseSalesRep = JSON.parse(JSON.stringify(salesRep))

        const saleRepObj = formatForBackend(paraseSalesRep)

        const configRequest={
            url: "api/v1/sales/reps",
            method: "POST",
            data: saleRepObj
        }

        function applyData(res){
            
            if(res.status === 200){
                dispatchRep({type: FIELDS.RESET, Payload:{}})
                setReset()
            }
        }

        await httpRequest(configRequest, applyData)

    }
    return(
        <tr id={"new_rep"} >
            <NameCell value={salesRep.first_name} name={'first_name'} inputChange={inputChange}/>
            <NameCell value={salesRep.last_name} name={"last_name"} inputChange={inputChange}/>
            <QuotaCell value={salesRep.quota} name={"quota"} inputChange={inputChange}/>
            <EmailCell value={salesRep.email} name={"email"} inputChange={inputChange}/>
            <PhoneCell value={salesRep.phone} name={"phone"} inputChange={inputChange}/>
            <RoleCell value={salesRep.role} inputChange={inputChange} />
            <NewRepsCell submit={submit} reset={reset}/>
        </tr>
    )
}

export default NewSalesRepTableRow;