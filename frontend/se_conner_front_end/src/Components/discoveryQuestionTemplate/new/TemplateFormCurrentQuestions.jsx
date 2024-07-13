import React from "react";
import TemplateQuestion from "./TemplateQuestion";



function TemplateFormCurrentQuestions({data, setData, setUpdate, addOrRemoveQuestion, isChanged}){
    
    function updateQuestionOrder(info){
        
        //check if the question is moving up or down
        const question_index = info.up? info.order - 2 : info.order;
        
        //find the question that is being moved
        const question = data.questions.find(question => question.id === info.id);
        
        
        //filter out the question that is being moved
        const filtered_list = data.questions.filter(question => question.id !== info.id);
        
        //create a new list with the question in the new position
        const new_order = []
        
        //loop through the filtered list and add the question in the new position
        for(let i = 0; i < filtered_list.length; i++){
            
            if(i === question_index){
                
                new_order.push(question);
            }

            new_order.push(filtered_list[i]);
        }

        
        const dataObj = {...data};
        dataObj.questions = new_order;
        dataObj.questionsIds = new_order.map(question => question.id);
        dataObj.saveCounter = Number(dataObj.saveCounter) + 1;
        
        setData(dataObj);
    }

    return(
        <div className="questions">
            {
                data && 
                data.questions.length > 0
                && data.questions.map((question, index) => (
                    <div key={index}>
                        <TemplateQuestion data={question}
                                        order={index + 1}
                                        updateQuestionOrder={updateQuestionOrder}
                        />
                    </div>  
                ))
            }
            <div className="save_order">
                {
                    data && 
                    data.questions.length <= 19
                    && <button className="" onClick={()=>setUpdate()}>Add/Remove Questions</button>
                }
                <button
                    disabled={!isChanged} 
                    onClick={(e)=>addOrRemoveQuestion(e)}
                    >Save Template</button>
            </div>
        </div>
    )
}


export default TemplateFormCurrentQuestions;