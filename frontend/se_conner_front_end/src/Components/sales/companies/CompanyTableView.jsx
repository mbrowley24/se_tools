import React from "react";
import Header from "../../header/Header";
import CompanyTable from "./CompanyTable";
import "../../../css/company/company_table.css"

function CompanyTableView(){
    return(
        <div>
            <Header/>
            <div className="company">
                <h1>Companies</h1>
                <CompanyTable/>
            </div>
        </div>
    )
}

export default CompanyTableView;