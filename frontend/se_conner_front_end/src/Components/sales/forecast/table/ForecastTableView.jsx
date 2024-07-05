import React from "react";
import Header from "../../../header/Header";
import ForecastTable from "./ForecastTable";
import "../../../../css/table/table_form.css";
import "../../../../css/forecast/forecast.css";



function ForecastTableView(){

    return(
        <div>
            <Header/>
            <div className="container">
                <h1>Forecast Table</h1>
                <ForecastTable/>
            </div>
        </div>
    )
}


export default ForecastTableView;