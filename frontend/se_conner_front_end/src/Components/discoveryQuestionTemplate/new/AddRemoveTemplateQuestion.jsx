import React from "react";
import "../../../css/question_template/add_remove_question.css"

function AddRemoveTemplateQuestion({data, questionIds, inputChange}){

    
    return(
        <div className="question">
            <div className="question_header">
                <div>
                    <p>Author: {data.author}</p>
                </div>
                <div>
                    <p>Updated: {new Date(data.updated).toLocaleDateString()}</p>
                </div>
                <div>
                    <label>Add:</label>
                    <input type="checkbox"
                        value={data.id}
                        checked={questionIds? questionIds.includes(data.id) : false}
                        onChange={(e) => inputChange(e)} 
                        />
                </div>
            </div>
            <div className="question_body">
                <p>{data.question}</p>
            </div>
        </div>
    )
}
export default AddRemoveTemplateQuestion;