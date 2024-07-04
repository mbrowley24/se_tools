import React, {useEffect, useReducer} from "react";
import Header from "../../../header/Header";
import { useParams } from "react-router-dom";
import AddOpportunityTable from "./AddOpportunityTable";
import AddOpportunityToolBar from "./AddOpportunityToolBar";
import useForecast from "../../../../hooks/useForecast";
import useHttp from "../../../../hooks/useHttp";
import useTextTransform from "../../../../hooks/useTextTransform";
import "../../../../css/table/table_form.css";


function AddOpportunityView({}){
    const {capitalizeName} = useTextTransform();
    const {forecastInitialState, forecastReducer} = useForecast();
    const [forecastData, dispatchForecastData] = useReducer(forecastReducer, forecastInitialState);
    const {id, rep_id} = useParams();
    const {httpRequest} = useHttp();
    
    const back = () => navigate(-1);

    useEffect(() => {

        const configRequest = {
            url: `api/v1/forecasts/${id}/sales-rep/${rep_id}/opportunities`,
            method: "GET"
        }

        function applyData(res){
            dispatchForecastData({type: "set_forecast", payload: res.data});
        }


        (async()=>{
            await httpRequest(configRequest, applyData);
        })()

    }, []);

    function addOpportunity(id){
        dispatchForecastData({type: "add_opportunity", payload: id});
    }

    return(
        <div>
            <Header/>
            <div className="container">
                <h1 className="">{capitalizeName(forecastData.sales_rep.name)}</h1>
                <h4>{`$ ${String(forecastData.value)}`}</h4>
                <AddOpportunityToolBar data={forecastData} id={id} rep_id={rep_id}/>
                <AddOpportunityTable data={forecastData} addOpportunity={addOpportunity}/>
            </div>
        </div>
    )
};
export default AddOpportunityView;