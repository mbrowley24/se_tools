import React from "react";
import Header from "../../header/Header";
import CompanyTable from "./CompanyTable";
import "../../../css/table/table_form.css";

function CompanyTableView(){
    
    return(
        <div>
            <Header/>
            <div className="container">
                <h1>Companies</h1>
                <CompanyTable/>
            </div>
        </div>
    )
}

export default CompanyTableView;