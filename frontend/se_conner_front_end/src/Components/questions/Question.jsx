import React from "react";
import QuestionHeader from "./QuestionHeader";




function Question({data}){

    return(
        <div className="footer_bar">
            <QuestionHeader data={data}/>
            <QuestionBody data={data}/>
            <QuestionToolbar data={data}/>
        </div>
    )

}

export default Question;