import React from "react";
import Question from "./Question";
import QuestionPage from "./QuestionPage";



function Questions({template, page, fields, dispatch}){
    
    
    return(
        <div className="questions_container">
            {
                page.data.map((question, index) => {
                        return(
                            <Question key={index} data={question} template={template}/>
                        )
                    })
            }
            
            <QuestionPage 
                dispatch={dispatch}
                names={fields}
                pageInfo={page}
                />
        </div>
    )
}

export default Questions;