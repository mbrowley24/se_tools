import React, {useEffect, useState} from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import useHttp from "../../../../hooks/useHttp";



function Table({}){
    const [reps, setReps] = useState([]);
    const {httpRequest} = useHttp();

    useEffect(() => {
        
        const configRequest={
            url: 'api/v1/sales/reps',
            method: 'GET',
            responseType: 'json'
        }

        function applyData(res){
            console.log(res)
            if(res.status === 200){
                if(res.data && res.data.data.length > 0){
                    setReps(res.data.data)
                }
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