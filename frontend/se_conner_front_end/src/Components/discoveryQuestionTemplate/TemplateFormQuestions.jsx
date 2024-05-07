import React from "react";



function TemplateFormQuestions({data}){

    return(
        <>
            {
                data && data.length > 0 && data.map((row, index) =>{
                    
                    <div key={index} className="question_body">
                        
                        {row.question}
                    </div>
                })
            }
            {
                data && data.length === 0 && (
                    <div className="question_body">
                        No data found
                    </div>
                )
            }
        </>
    )
}

export default TemplateFormQuestions;