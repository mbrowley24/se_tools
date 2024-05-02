import React, {useEffect, useState} from "react";
import QuestionHeader from "./QuestionHeader";
import QuestionBody from "./QuestionBody";
import QuestionToolbar from "./QuestionToolbar";



function Question({data, template}){
    const [question, setQuestion] = useState({
        "author": "",
        "created_at": "",
        "id": "",
        "question": "",
        "vote_down": false,
        "vote_up": false,
        "voted": 0,
        "my_vote": false
    });
    
    useEffect(() => {

        if(data){
            setQuestion(data)
        }

    }, [data])
    
    return(
        <div className="question_container">
            <QuestionHeader data={question}/>
            <QuestionBody data={question} />
            <QuestionToolbar data={question} setQuestion={setQuestion} template={template}/>
        </div>
    )

}

export default Question;