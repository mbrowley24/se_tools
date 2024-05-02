import React, {useEffect, useReducer} from "react";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import Questions from "./Questions";
import "../../css/discoveryQuestions/questions.css"
import "../../css/small_spinner.css"
import usePageInfo from "../../hooks/usePageInfo";
import useHttp from "../../hooks/useHttp";

function QuestionView({}){
    const {httpRequest, isLoading, setIsLoading} = useHttp();
    const {pageReducer, pageInfo, PAGE_FIELDS} = usePageInfo();
    const [page, dispatchPage] = useReducer(pageReducer, pageInfo);
    

    useEffect(() => {
        

        const requestConfig = {
            url: `api/v1/questions?page=${page.page}&page_size=${page.page_size}`,
            method: "GET",
            data: null,
            signal : null
        }

        function applyData(res){

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

    }, []);

    return(
        <div className="page_height">
            <Header/>
            <div className="title_container">
                <h2>Discovery Questions</h2>
                <Link to={'/discoveryquestions/new'}>New Question</Link>
            </div>
            <Questions  
                        page={page}
                        dispatch={dispatchPage}
                        fields={PAGE_FIELDS} 
            />
            {
                !isLoading && page.data.length === 0 && <h3 className="no_questions">No questions found</h3>
            }
            {
                !isLoading && page.data.length === 0 && <h3 className="no_questions">No questions found</h3>
            }
            {
                isLoading && <div className="loader_conainer">
                                <div className="loader"></div>
                            </div>
            }
        </div>
    )
}

export default QuestionView;