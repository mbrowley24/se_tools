import React, {useState} from "react";
import CompanyTitle from "./CompanyTitle";
import OpportunityTable from "../../opportunities/table/OpportunityTable";
import ContactTable from "../../contacts/table/ContactTable";
import CompaniesToolBar from "./CompaniesToolBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { companyActions } from "../../../../store/company";
import Pagination from "./Pagination";



function CompanyDetails({data, id}){
    const view = useSelector(state => state.companyData.views);
    
    return(
        <div className="container">
            <div>
                <CompanyTitle data={data}/>
                <div className="new_links">
                    { data.views.opportunities && <Link to={`/sales/companies/${data.company.id}/opportunities/new`}>New Opportunity</Link> }
                    { data.views.contacts && <Link to={`/sales/companies/${data.company.id}/contacts/new`}>New Contacts</Link> }
                </div>
                <CompaniesToolBar action={companyActions} value={view}/>
            </div>
            {data.views.opportunities &&  <OpportunityTable data={data.company.opportunities.content}/>}
                
            { data.views.contacts && <ContactTable data={data.company.contacts.content} id={id}/>}
            { data.views.opportunities && <Pagination data={data.company.opportunities}/>}
            { data.views.contacts && <Pagination data={data.company.contacts}/>}
        </div>
    )
}

export default CompanyDetails;