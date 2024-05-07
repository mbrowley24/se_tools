import React from "react";



function TemplateFormCurrentQuestions({data, edit}){


    return(
        <div className="questions">
            {
                data && 
                data.length > 0
                && data.map((question, index) => (
                    <div key={index}>
                        <TextField value={question.question} />
                        <TextField value={question.answer} />
                    </div>  
                ))
            }
            {
                data && 
                data.length <= 19
                && <button className="edit_questions" onClick={()=>edit()}>Edit Questions</button>
            }
        </div>
    )
}


export default TemplateFormCurrentQuestions;