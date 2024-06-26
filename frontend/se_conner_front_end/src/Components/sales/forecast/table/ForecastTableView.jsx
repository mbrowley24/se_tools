import React from "react";
import Header from "../../../header/Header";
import ForecastTable from "./ForecastTable";
import { Link } from "react-router-dom";
import "../../../../css/table/table_form.css";
import "../../../../css/forecast/forecast.css";



function ForecastTableView(){

    return(
        <div>
            <Header/>
            <div className="container">
                <h1>Forecast Table</h1>
                <div className="new_links">
                    <Link to={'/sales/forecast/create'}>New Forecast</Link>
                </div>
                <ForecastTable/>
            </div>
        </div>
    )
}


export default ForecastTableView;