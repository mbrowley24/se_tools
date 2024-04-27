import React, {useEffect, useReducer} from "react";
import useHttp from "../../hooks/useHttp";
import Question from "./Question";
import QuestionPage from "./QuestionPage";
import usePageInfo from "../../hooks/usePageInfo";


function Questions({}){
    const {pageReducer, pageInfo, PAGE_FIELDS} = usePageInfo();
    const [page, dispatchPage] = useReducer(pageReducer, pageInfo);
    const {isLoading, setIsLoading, httpRequest} = useHttp();


    useEffect(() => {
        

        const requestConfig = {
            url: `api/v1/questions?page=${page.page}&page_size=${page.page_size}`,
            method: "GET",
            data: null,
            signal : null
        }

        function applyData(res){
            console.log(res)
            if(res.status === 200){
                if(res.data.data){
                    dispatchPage({type: PAGE_FIELDS.LOAD_PAGE, payload: res.data.data})
                }
            }
        }

        (async () => {

            await httpRequest(requestConfig, applyData)

        })()

        return () => {
            setIsLoading(false)
        }

    }, [page.page]);

    return(
        <div className="questions_container">
            {
                !isLoading && page.data.length > 0 && page.data.map((question, index) => {
                        return(
                            <Question key={index} data={question}/>
                        )
                    })
            }
            {
                !isLoading && page.data.length === 0 && <h3 className="no_questions">No questions found</h3>
            }
            {
                isLoading && <div className="loader_conainer_sm">
                                <div className="loader_sm"></div>
                            </div>
            }
            <QuestionPage dispatch={dispatchPage} names={PAGE_FIELDS} pageInfo={page}/>
        </div>
    )
}

export default Questions;