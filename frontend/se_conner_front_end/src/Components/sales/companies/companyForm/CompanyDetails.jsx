import React, {useState} from "react";
import CompanyTitle from "./CompanyTitle";
import OpportunityTable from "../../opportunities/table/OpportunityTable";
import ContactTable from "../../contacts/table/ContactTable";
import CompaniesToolBar from "./CompaniesToolBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { companyActions } from "../../../../store/company";
import Pagination from "./Pagination";



function CompanyDetails({data}){
    const view = useSelector(state => state.companyData.views);
    
    return(
        <div className="container">
            <div>
                <CompanyTitle data={data}/>
                <div className="new_links">
                    { view.opportunities && <Link to={`/sales/companies/${data.id}/opportunities/new`}>New Opportunity</Link> }
                    { view.contacts && <Link to={`/sales/companies/${data.id}/contacts/new`}>New Contacts</Link> }
                </div>
                <CompaniesToolBar action={companyActions} value={view}/>
            </div>
            {view.opportunities &&  <OpportunityTable data={data.opportunities.content}/>}
                
            { view.contacts && <ContactTable data={data.contacts.content}/>}
            <Pagination data={data.opportunities}/>
        </div>
    )
}

export default CompanyDetails;