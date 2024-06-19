import React, {useEffect, useState} from "react";
import useHttp from "../../../../hooks/useHttp";
function OpportunitySalesReps({inputChange, value}){
    const [salesReps, setSalesReps] = useState([]);
    const {httpRequest} = useHttp();

    useEffect(()=>{

        const configRequest={
            url: "api/v1/sales-reps/options",
            method: "GET",
        }

        
        function applyData(res){
            console.log(res)
            setSalesReps(res.data);
        }


        (async()=>{
            await httpRequest(configRequest, applyData);
        })()

    },[])
    
    return(
        
        <td>
            <select name="sales_rep"
                value={value}
                onChange={(e)=>inputChange(e)}   
            >
                <option value="">Choose Sales Rep</option>
                {
                    salesReps.map((rep)=>{
                        return(
                            <option key={rep.value} value={rep.value}>{rep.name}</option>
                        )
                    })
                }
            </select>
        </td>
    )
}

export default OpportunitySalesReps;