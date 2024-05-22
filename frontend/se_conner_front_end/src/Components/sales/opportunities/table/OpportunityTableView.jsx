import React, {useContext, useEffect} from "react";
import DataContext from "../../../../context/dataContext";
import Header from "../../../header/Header";
import useHttp from "../../../../hooks/useHttp";
import OpportunityTable from "./OpportunityTable";
import "../../../../css/opportunity/opportunity_table.css";
import { Link } from "react-router-dom";


function OpportunityTableView(){
    const {httpRequest} = useHttp();
    const {setOppStatus} = useContext(DataContext);

    useEffect(()=>{
        const config ={
            url: "api/v1/opportunity/status",
            method: "GET",
        }

        function applyData(res){
            setOppStatus(res.data.data);
        }

        (async()=>{
            
            await httpRequest(config, applyData);
            
        })()

    },[])

    return(
        <div>
            <Header/>
            <div className="opportunity_table">
                <h1 className="">Sales Opportunities</h1>
                <div className="new_opp">
                    <Link to="/sales/opportunities/create" className="btn btn-primary">Create Opportunity</Link>
                </div>
                <OpportunityTable/>
            </div>
        </div>
    )
}

export default OpportunityTableView;