import React, {useEffect, useState} from "react";
import useHttp from "../../hooks/useHttp";
import Question from "./Question";


function Questions({}){
    const {isLoading, httpRequest} = useHttp();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        

        const requestConfig = {
            url: "api/v1/questions",
            method: "GET",
            data: null,
            signal : null
        }

        function applyData(response){
            
            if(response.status === 200){
                if(response.data.data){
                    setQuestions(response.data.data)
                }
            }
        }

        (async () => {

            await httpRequest(requestConfig, applyData)

        })()

        return () => {
        }

    }, []);

    return(
        <div>
            {
            questions.length > 0 &&   questions.map((question, index) => {
                    return(
                        <Question key={index} data={question}/>
                    )
                })
            }
            {
                questions.length === 0 && <h3 className="no_questions">No questions found</h3>
            }
        </div>
    )
}

export default Questions;