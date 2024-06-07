import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../header/Header";
import EditISPServicesTable from "./EditISPServicesTable";
import useISPService from "../../../hooks/useISPService";
import useHttp from "../../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { ispActions } from "../../../store/ispStore";
import "../../../css/table/table_form.css";

function EditISPServicesView(){
    const {id} = useParams();
    const dispatch = useDispatch();
    const data = useSelector(state => state.ispData);
    const {httpRequest} = useHttp();

    useEffect(() => {

        const config={
            method: 'GET',
            url: `api/v1/isp/categories/${id}`
        }

        function applyData(res){
            
            if(res.status === 200){
                if(res.data){
                    dispatch(ispActions.setServiceData(res.data));
                }
            }
            
        }

        (async () => {
            await httpRequest(config, applyData);
        })();
    }, []);

    function appService(data){
        
        dispatch(ispActions.addService(data));

    }
    
    return(
        <div>
            <Header/>
            <div className="container">
                <h1>{data.category.name.toUpperCase()}</h1>
                <div className="links">
                    <Link to={`/sales/isp/${data.isp.id}`}>back to categories</Link>
                </div>
                <EditISPServicesTable data={data.serviceData} id={id} addService={appService}/>
            </div>
        </div>
    )
}

export default EditISPServicesView;