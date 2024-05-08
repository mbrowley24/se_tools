import React, {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header";
import TemplateForm from "./TemplateForm";
import useHttp from "../../hooks/useHttp";
import useTemplate from "../../hooks/useTemplate";
import "../../css/question_template/question_template.css";

function TemplateFormView(){
    const {id} = useParams();
    const navigate = useNavigate();
    const {checkForChanges} = useTemplate();
    const [update, setUpdate] = useState(false);
    const [orginalQuestionIds, setOrginalQuestionIds] = useState([]);
    const [requery, setRequery] = useState(false);
    const [questions, setQuestions] = useState({
        id: '',
        name: '',
        questions: [],
        questionsIds: [],
        saveCounter: 0
    });
    const isChanged = useMemo(() =>{
        return checkForChanges(orginalQuestionIds, questions.questionsIds)
    }, [questions, orginalQuestionIds]);

    
    const {httpRequest} = useHttp();
    const changeUpdate = () => setUpdate((prev) => !prev);
    const queryQuestions = () => setRequery((prev) => !prev);
    const setOrginalIds = (ids) => setOrginalQuestionIds(ids);

    

    useEffect(() => {
        
        const configRequest = {
            url: `/api/v1/questions/templates/${id}`,
            method: 'GET'
        };

        function applyData(res){
            
            if(res.status === 200){
                
                if(res.data.data){
                    
                    const data = {...res.data.data};

                    const questionIds = data.questions.map(question => question.id);
                    
                    const questionObj = {...questions}
                    questionObj.id = data.id;
                    questionObj.name = data.name;
                    questionObj.questions = questions? [...data.questions] : [];
                    questionObj.questionsIds = [...questionIds];
                    questionObj.saveCounter = 0;

                    setQuestions(questionObj);

                    setOrginalIds([...questionIds]);
                    
                }
            }

            if (res.status === 403) {
                navigate('/login');
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();

    }, [update, id, requery]);


    return(
        <div>
            <Header/>
            <div className="template">
                <h1>Edit Template</h1>
                <div className="new_template">
                    <TemplateForm 
                        data={questions}
                        setData={setQuestions}
                        setUpdate={changeUpdate}
                        queryQuestions={queryQuestions}
                        isChanged={isChanged}
                        update={update}
                        id={id}
                        />
                </div>
                
            </div>
        </div>
    )
}

export default TemplateFormView;