import React, {useEffect, useState} from "react";
import Header from "../../header/Header";
import TemplateTable from "./TemplateTable";
import useHttp from "../../../hooks/useHttp";
import "../../../css/question_template/template.css"
import NewTemplateForm from "./NewTemplateForm";



function TemplateView({}){
    const {httpRequest} = useHttp();
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(false);
    
    const reset = () => setUpdate(prev => !prev);

    useEffect(() => {
        
        const controller = new AbortController();

        const configRequest={
            method: 'GET',
            url: 'api/v1/discovery-question-templates',
            signal: controller.signal
        }

        function applyData(res){
            if (res.status === 200) {    
                setData(res.data)
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
                <TemplateTable data={data} reset={reset}/>
            </div>
        </>
    )
}


export default TemplateView;