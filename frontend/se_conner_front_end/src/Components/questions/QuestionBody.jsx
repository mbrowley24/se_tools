import React from "react";




function QuestionBody({data}){

    return(
        <div className="question_body">
            {data.question}
        </div>
    )
}

export default QuestionBody;