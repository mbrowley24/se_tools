import React, {useContext, useEffect, useState} from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import DataContext from "../../../../context/dataContext";
import useHttp from "../../../../hooks/useHttp";



function Table({deleteRep, reset, setReset}){
    const {userdata, dispatchUser, FIELDS} = useContext(DataContext);
    const [reps, setReps] = useState([]);
    const {httpRequest} = useHttp();

    useEffect(() => {
        console.log('Table useEffect')
        const configRequest={
            url: 'api/v1/sales/reps',
            method: 'GET',
            responseType: 'json'
        }

        function applyData(res){
            
            if(res.status === 200){
                
                if(res.data && res.data.data && res.data.data.length > 0){
                    
                    setReps(res.data.data)
                
                }else{
                    console.log('No Sales Reps')
                    setReps([])
                }
            }
        }

        (async()=>{
            await httpRequest(configRequest, applyData)
        })()

    },[reset])

    useEffect(() => {

        if (!reps || reps.length === 0){
            dispatchUser({type: FIELDS.QUOTA, payload: 0})
            return;
        }

        let quota = 0;

        for(let i = 0; i < reps.length; i++){
            
            console.log('quota', reps[i].quota)

            quota += reps[i].quota
        }
        
        dispatchUser({type: FIELDS.QUOTA, payload: quota})
    },[reps])
    
    return(
        <table>
            <TableHead/>
            <TableBody reps={reps} setReset={setReset} deleteRep={deleteRep}/>
        </table>
    )
}
export default Table;