import React from "react";
import QuestionBody from "../../questions/panels/QuestionBody";
import QuestionToolbar from "./QuestionToolbar";




function AddQuestionPanel({data, dispatch, question_ids}){
    return(
        <div className="template_question">
            <QuestionToolbar data={data} question_ids={question_ids} dispatch={dispatch}/>
            <QuestionBody data={data}/>
        </div>
    )
}

export default AddQuestionPanel;