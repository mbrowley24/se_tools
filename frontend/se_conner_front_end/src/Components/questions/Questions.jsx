import React, {useEffect, useState} from "react";
import useHttp from "../../hooks/useHttp";
import Question from "./Question";


function Questions({}){
    const {isLoading, setIsLoading, httpRequest} = useHttp();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        

        const requestConfig = {
            url: "api/v1/questions",
            method: "GET",
            data: null,
            signal : null
        }

        function applyData(res){

            if(res.status === 200){
                if(res.data.data){
                    setQuestions(res.data.data)
                }
            }
        }

        (async () => {

            await httpRequest(requestConfig, applyData)

        })()

        return () => {
            setIsLoading(false)
        }

    }, []);

    return(
        <div className="questions_container">
            {
                !isLoading && questions.length > 0 &&   questions.map((question, index) => {
                        return(
                            <Question key={index} data={question}/>
                        )
                    })
            }
            {
                !isLoading && questions.length === 0 && <h3 className="no_questions">No questions found</h3>
            }
            {
                isLoading && <div className="loader_conainer">
                                <div className="loader"></div>
                            </div>
            }
            
        </div>
    )
}

export default Questions;