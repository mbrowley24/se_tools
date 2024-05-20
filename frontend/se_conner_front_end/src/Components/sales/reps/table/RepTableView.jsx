import React from "react";
import Header from "../../../header/Header";
import Table from "./Table";
import AddSalesRep from "./AddSalesRep";
import "../../../../css/salesrep/salesreptable.css";



function RepTableView() {
    
    return (
        <div>
            <Header/>
            <div className="sales_rep_container">
                <h1>Sales Reps</h1>
                <AddSalesRep/>
                <Table/>
            </div>
        </div>
    );
}

export default RepTableView;