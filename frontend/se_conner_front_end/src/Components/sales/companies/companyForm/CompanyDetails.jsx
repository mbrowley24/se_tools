import React, {useState} from "react";
import CompanyTitle from "./CompanyTitle";
import OpportunityTable from "../../opportunities/table/OpportunityTable";
import ContactTable from "../../../contacts/table/ContactTable";
import CompaniesToolBar from "./CompaniesToolBar";
import { Link } from "react-router-dom";





function CompanyDetails({data}){
    const [toggle, setToggle] = useState(true);
    const toggleTables = () => setToggle(!toggle);
    
    return(
        <div className="container">
            <div>
                <CompanyTitle data={data}/>
                <div className="new_links">
                    <Link to={`/sales/companies/${data.id}/opportunities/new`}>New Opportunity</Link>
                </div>
                <CompaniesToolBar toogle={toggleTables} value={toggle}/>
            </div>
            {
            toggle?  
                <OpportunityTable data={data.opportunities}/>
                :
                <ContactTable data={data.contacts.content}/>
            }
        </div>
    )
}

export default CompanyDetails;