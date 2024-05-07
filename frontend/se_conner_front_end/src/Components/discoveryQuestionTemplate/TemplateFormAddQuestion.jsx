import React, {useEffect, useMemo, useState} from "react";
import useHttp from "../../hooks/useHttp";
import AddRemoveTemplateQuestion from "./AddRemoveTemplateQuestion";
import "../../css/question_template/add_remove_question.css";


function TemplateFormAddQuestion({ id, data, setUpdate }){
    
    const {httpRequest} = useHttp();
    const [questions, setQuestions] = useState([]);
    const [newQuestionIds, setNewQuestionIds] = useState([]);
    const questionIds = useMemo(() => data.questions, [data.questions]);
    
    //add or remove questions from the template
    function inputChange(e){

        const questionIdList = [...newQuestionIds];
        const newId  = e.target.value;
        const idIncluded = questionIdList.includes(newId);
        
        if(idIncluded){
            const newQuestionIds = questionIdList.filter(id => id !== newId);
            setNewQuestionIds([...newQuestionIds]);

        }else{
            setNewQuestionIds([...questionIdList, newId]);
        }
    }

    //update the question ids when the questionIds change
    useEffect(() => {
        setNewQuestionIds([...questionIds]);
    }, [questionIds]);

    //get all questions for the template
    useEffect(() => {

        const configRequest = {
            url: `api/v1/questions/templates/${id}/summary`,
            method: 'GET',
        };

        function applyData(res){
            
            if(res.status === 200){
                setQuestions(res.data.data);
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();

    }, [id]);


    function addOrRemoveQuestion(e){
        e.preventDefault();

        const configRequest = {
            url: `api/v1/questions/templates/${id}/questions`,
            method: 'PUT',
            data: {questionIds: newQuestionIds}
        };

        function applyData(res){
            console.log(res);
            if(res.status === 200){
            
                setUpdate((prev) => !prev);
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();
        
    }

    return(
        <div className="add_remove_questions">
            {
                questions.map((question, index) => {
                    return(
                        <AddRemoveTemplateQuestion 
                            key={index} 
                            data={question}
                            newQuestionIds={newQuestionIds}
                            inputChange={inputChange}
                        />
                    )
                })
            }
        </div>
    )
}

export default TemplateFormAddQuestion;