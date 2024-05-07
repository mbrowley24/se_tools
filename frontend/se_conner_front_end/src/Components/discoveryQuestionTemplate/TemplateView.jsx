import React, {useEffect, useReducer, useState} from "react";
import Header from "../header/Header";
import {Link} from "react-router-dom";
import TemplateTable from "./TemplateTable";
import usePageInfo from "../../hooks/usePageInfo";
import useHttp from "../../hooks/useHttp";
import "../../css/question_template/template.css"
import NewTemplateForm from "./NewTemplateForm";



function TemplateView({}){
    const {pageReducer, pageInfo, PAGE_FIELDS} = usePageInfo();
    const {httpRequest} = useHttp();
    const [data, dispatch] = useReducer(pageReducer, pageInfo);
    const [update, setUpdate] = useState(false);
    
    useEffect(() => {
        
        const controller = new AbortController();

        const configRequest={
            method: 'GET',
            url: 'api/v1/questions/templates',
            signal: controller.signal
        }

        function applyData(res){
            console.log(res)
            if (res.status === 200) {
                
                dispatch({type: PAGE_FIELDS.LOAD_PAGE, payload: res.data.data})
            }
            
        }

        (async () => {
            httpRequest(configRequest, applyData)
        })();

    }, [update]);

    return(
        <>
            <Header/>
            <div className="template">
                <h1>Discovery Question Templates</h1>
                <div className="new_template_sm">
                    <NewTemplateForm setUpdate={setUpdate}/>
                </div>
                <TemplateTable data={data.data}/>
            </div>
        </>
    )
}


export default TemplateView;