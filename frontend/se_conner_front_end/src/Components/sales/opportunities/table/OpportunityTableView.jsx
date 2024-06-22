import React, {useEffect, useState} from "react";
import Header from "../../../header/Header";
import useHttp from "../../../../hooks/useHttp";
import OpportunityTable from "./OpportunityTable";
import "../../../../css/opportunity/opportunity_table.css";



function OpportunityTableView(){
    const {httpRequest} = useHttp();
    const [opportunities, setOpportunities] = useState([]);

    useEffect(()=>{

        const configRequest={
            url:"api/v1/opportunities",
            method:"GET"
        }


        function applyData(res){

            if(res.status === 200){
                setOpportunities(res.data);
            }
        }

        (async()=>{
        
            await httpRequest(configRequest, applyData);
        
        })()

    }, [])

    return(
        <div>
            <Header/>
            <div className="opportunity_table">
                <h1 className="">Sales Opportunities</h1>
                <OpportunityTable data={opportunities}/>
            </div>
        </div>
    )
}

export default OpportunityTableView;