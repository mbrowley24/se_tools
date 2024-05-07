import React, {useEffect, useReducer, useState} from "react";
import {useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header";
import TemplateForm from "./TemplateForm";
import useHttp from "../../hooks/useHttp";
// import useTemplate from "../../hooks/useTemplate";
import "../../css/question_template/question_template.css";

function TemplateFormView(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [update, setUpdate] = useState(false);
    const [questions, setQuestions] = useState({
        id: '',
        name: '',
        questions: []
    });

    // const {initialTempState, templateReducer, TEMPLATE_FIELDS} = useTemplate();
    // const [template, dispatchTemp] = useReducer(templateReducer, initialTempState);
    const {httpRequest} = useHttp();

    useEffect(() => {

        const configRequest = {
            url: `/api/v1/questions/templates/${id}`,
            method: 'GET'
        };

        function applyData(res){
            
            if(res.status === 200){
                
                if(res.data.data){
                    
                    const {id, name, questions} = res.data.data;

                    setQuestions({
                        id: id,
                        name: name,
                        questions: questions? questions : []
                    });
                }
            }

            if (res.status === 403) {
                navigate('/login');
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();

    }, [update, id]);

    return(
        <div>
            <Header/>
            <div className="template">
                <h1>Edit Template</h1>
                <div className="new_template">
                    <TemplateForm 
                        data={questions}
                        setUpdate={setUpdate}
                        id={id}
                        />
                </div>
                
            </div>
        </div>
    )
}

export default TemplateFormView;