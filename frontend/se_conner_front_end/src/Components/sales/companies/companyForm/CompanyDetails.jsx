import React from "react";
import CompanyTitle from "./CompanyTitle";
import OpportunityTable from "../../opportunities/table/OpportunityTable";
import ContactTable from "../../../contacts/table/ContactTable";
import CompaniesToolBar from "./CompaniesToolBar";





function CompanyDetails({data}){

    return(
        <div>
            <div>
                <CompanyTitle data={data}/>
                <CompaniesToolBar/>
            </div>
            
            <div>
                <OpportunityTable data={data.opportunities}/>
                <ContactTable data={data.contacts}/>
            </div>
        </div>
    )
}

export default CompanyDetails;