import React, {useEffect, useState} from "react";
import useHttp from "../../../../hooks/useHttp";
import OpportunityTableHead from "./OpportunityTableHead";
import OpportunityTableBody from "./OpportunityTableBody";



function OpportunityTable({}){
    const {httpRequest} = useHttp();
    const [opportunities, setOpportunities] = useState([]);

    useEffect(()=>{
        const config ={
            url: "api/v1/opportunity",
            method: "GET",
        }

        function applyData(res){
            console.log(res);
            if(res.data.data.items){
                setOpportunities(res.data);
            }
        }

        (async()=>{
            
            await httpRequest(config, applyData);
            
        })()

    },[])
    
    return(
        <table>
            <OpportunityTableHead/>
            <OpportunityTableBody opportunities={opportunities}/>
        </table>
    )
}
export default OpportunityTable;