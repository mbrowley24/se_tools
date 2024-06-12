import React, {useContext, useEffect, useState} from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useDispatch, useSelector } from "react-redux";
import { salesRepActions } from "../../../../store/salesRep";
import useHttp from "../../../../hooks/useHttp";



function Table({}){
    const dispatch = useDispatch();
    const {httpRequest} = useHttp();
    const reps = useSelector(state => state.salesRepData.reps);
    
    useEffect(() => {
        
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
        <table>
            <TableHead/>
            <TableBody reps={reps}/>
        </table>
    )
}
export default Table;