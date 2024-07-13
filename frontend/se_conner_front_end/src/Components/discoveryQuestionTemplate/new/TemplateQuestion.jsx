import React, {useEffect, useState} from "react";



function TemplateQuestion({data, updateQuestionOrder, order}){
    
    // useEffect(() => {
    //     setOrder(order);
    // }, [order]);

    

    return(
        <div className="question">
            <div className="question_header">
                <div>
                    <p>Author: {data.author}</p>
                </div>
                <div>
                    <p>Updated: {new Date(data.updated).toLocaleDateString()}</p>
                </div>
                <div className="order_selector">
                    <button onClick={()=>updateQuestionOrder({up:true, order:order, id: data.id})}>
                        <span className="material-symbols-outlined">
                            arrow_drop_up
                        </span>
                    </button>
                    <p>{order}</p>
                    <button onClick={()=>updateQuestionOrder({up:false, order:order, id: data.id})} >
                        <span className="material-symbols-outlined">
                            arrow_drop_down
                        </span>
                    </button>
                </div>
            </div>
            <div className="question_body">
                <p>{data.question}</p>
            </div>
        </div>
    )
}

export default TemplateQuestion;