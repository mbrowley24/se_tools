import React, {useEffect, useState, useReducer} from "react";
import { Link } from "react-router-dom";
import Header from "../../header/Header";
import Questions from "./Questions";
import "../../../css/discoveryQuestions/questions.css"
import "../../../css/small_spinner.css"
import usePageInfo from "../../../hooks/usePageInfo";
import useHttp from "../../../hooks/useHttp";

function QuestionView({}){
    const {httpRequest, isLoading, setIsLoading} = useHttp();
    const {pageReducer, pageInfo, PAGE_FIELDS} = usePageInfo();
    const [page, dispatchPage] = useReducer(pageReducer, pageInfo);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        

        const controller = new AbortController();

        const requestConfig = {
            url: `api/v1/discovery-questions?page=${page.page}&page_size=${page.page_size}`,
            method: "GET",
            data: null,
            signal : controller.signal
        }

        function applyData(res){
            
            if(res.status === 200){
                if(res.data){
                    dispatchPage({type: PAGE_FIELDS.LOAD_PAGE, payload: res.data})
                }
            }
        }

        (async () => {

            await httpRequest(requestConfig, applyData)

        })()

        return () => {
            controller.abort();
            setIsLoading(false)
        }

    }, [reset]);

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
                reset={setReset}
            />
            
        </div>
    )
}

export default QuestionView;