import React from "react";
import QuestionHeader from "./QuestionHeader";
import QuestionBody from "./QuestionBody";
import QuestionToolbar from "./QuestionToolbar";



function Question({data}){
    console.log(data)
    return(
        <div className="question_container">
            <QuestionHeader data={data}/>
            <QuestionBody data={data}/>
            <QuestionToolbar data={data}/>
        </div>
    )

}

export default Question;