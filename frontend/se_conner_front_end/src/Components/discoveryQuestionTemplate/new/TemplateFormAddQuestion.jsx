import React, {useEffect, useMemo, useState} from "react";
import useHttp from "../../../hooks/useHttp";
import AddRemoveTemplateQuestion from "./AddRemoveTemplateQuestion";
import "../../../css/question_template/add_remove_question.css";


function TemplateFormAddQuestion({ id, data, setData, setUpdate, isChanged}){
    const {httpRequest} = useHttp();
    const [questionData, setQuestionData] = useState([]);
    


    //add or remove questions from the template
    function inputChange(e){
        
        //get list of ids from state
        const questionIdList = [...data.questionsIds];
        
        //value of checkbox target
        const newId  = e.target.value;

        //check if the id is already in the list
        const idIncluded = questionIdList.includes(newId);
        
        //if the id is in the list remove it, else add it
        if(idIncluded){

            const dataObj = {...data}

            dataObj.questionsIds = questionIdList.filter(id => id !== newId);
            
            if(dataObj.saveCounter > 0){
                
                dataObj.saveCounter = Number(dataObj.saveCounter) + 1;

            }else{

                dataObj.saveCounter = Number(dataObj.saveCounter) - 1;
            }

            console.log(dataObj);
            setData(dataObj);

        }else{

            //add list of ids to the state
            const dataObj = {...data}

            dataObj.questionsIds.push(newId);

            dataObj.saveCounter = Number(dataObj.saveCounter) + 1;
            console.log(dataObj);
            //set state
            setData(dataObj);
        }

    }

    //get all questions for the template
    useEffect(() => {

        if(!id) return;
        
        const configRequest = {
            url: `api/v1/questions/templates/${id}/summary`,
            method: 'GET',
        };

        function applyData(res){
            
            if(res.status === 200){
                
                setQuestionData([...res.data.data]);
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();


        return () => {};

    }, [id]);


    function addOrRemoveQuestion(e){
        e.preventDefault();


        const configRequest = {
            url: `api/v1/questions/templates/${id}/addRemove`,
            method: 'PUT',
            data: {questionIds: data.questionsIds}
        };

        function applyData(res){
            console.log(res);

            if(res.status === 200){
                
                setUpdate();
                
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();
        
    }
    
    return(
        <div className="add_remove_questions">
            {
                questionData && questionData.length > 0 &&  questionData.map((question, index) => {
                    return(
                        <AddRemoveTemplateQuestion 
                            key={index} 
                            data={question}
                            questionIds={data.questionsIds}
                            inputChange={inputChange}
                        />
                    )
                })
            }
            <div className="save_questions">
                <button disabled={!isChanged} onClick={addOrRemoveQuestion}>Save</button>
                <button onClick={setUpdate} >Cancel</button>
            </div>
        </div>
    )
}

export default TemplateFormAddQuestion;