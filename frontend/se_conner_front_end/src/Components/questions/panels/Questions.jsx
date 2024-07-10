import React from "react";
import Question from "./Question";
import QuestionPage from "./QuestionPage";



function Questions({page, fields, dispatch, isLoading}){
    
    
    return(
        <div className="questions_container">
            {
                page.data.map((question, index) => {
                        return(
                            <Question key={index} dispatch={dispatch} data={question}/>
                        )
                    })
            }
            {
                !isLoading && page.data.length === 0 && <h3 className="no_questions">No questions found</h3>
            }
            {
                isLoading && <div className="loader_conainer">
                                <div className="loader"></div>
                            </div>
            }
            { page.data.length > 0 && <QuestionPage 
                dispatch={dispatch}
                names={fields}
                pageInfo={page}
                />
            }
        </div>
    )
}

export default Questions;