import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import useHttp from "../../../../hooks/useHttp";


function NewOpportunityLink({data}){
    const [oppLimit, setOppLimit] = useState(false);
    const {httpRequest} = useHttp();
    
    useEffect(()=>{

        if(!data.company.id) return

        const config ={
            url: `api/v1/companies/${data.company.id}/opportunities/limit`,
            method: "GET",
        }

        function applyData(res){
            
            if(res.status === 200){
                
                setOppLimit(res.data);
            }
        }

        (async()=>{
            await httpRequest(config, applyData);
        })()

    },[data])

    return(
        <>
            { !oppLimit ?
                <Link to={`/sales/companies/${data.company.id}/opportunities/new`}>New Opportunity</Link>
                :
                <span>Close Opportunities</span>
            }
        </>
    )
};
export default NewOpportunityLink;