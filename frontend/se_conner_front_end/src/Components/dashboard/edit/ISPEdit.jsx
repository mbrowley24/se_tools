import React from "react";
import ISPTable from "./ISPTable";
import Header from "../../header/Header";
import "../../../css/table/table_form.css";


function ISPEdit() {

    return(
        <div>
            <Header />
            <div className="container">
                <h1>ISPs</h1>
                <ISPTable />
            </div>
            
        </div>
    )
};

export default ISPEdit;