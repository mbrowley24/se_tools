import React, {useEffect, useReducer} from "react";
import useHttp from "../../../hooks/useHttp";
import useTemplate from "../../../hooks/useTemplate";
import AddQuestionPanel from "./AddQuestionPanel";
import Pagination from "../../form/Pagination";
import SaveQuestions from "./SaveQuestions";


function AddQuestions({id}){
    const {httpRequest} = useHttp();
    const {templateQuestionReducer, templateQuestionInit} = useTemplate();
    const [tempData, dispatch] = useReducer(templateQuestionReducer, templateQuestionInit);

    useEffect(() => {

        const configRequest ={
            method: 'GET',
            url: `api/v1/discovery-question-templates/${id}/questions`,
        }

        function applyData(res){
            console.log(res)
            if(res.status === 200){
                dispatch({type: "set_up", payload: res.data})
            }
            
        }

        (async function(){
            await httpRequest(configRequest, applyData)
        })()


    },[])

    return(
        <div className="template">
            <SaveQuestions id={id} data={tempData}/>
            {
                tempData.page.content.map((data, index) => {
                    return(     
                        <AddQuestionPanel key={index} 
                                        dispatch={dispatch}
                                        data={data} 
                                        question_ids={tempData.question_ids}
                                        />
                    )
                })
            }
            {tempData.page.content.length === 0 && <div>No questions found</div>}
            <Pagination data={tempData.page} dispatch={dispatch}/>
        </div>
    )
}


export default AddQuestions;