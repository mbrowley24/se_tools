import React, {useEffect, useMemo, useReducer} from "react";
import useDiscoveryQuestions from "../../../hooks/useDiscoveryQuestions";
import Header from "../../header/Header";
import QuestionForm from "../new/QuestionForm";
import useHttp from "../../../hooks/useHttp";
import { useNavigate, useParams } from "react-router-dom";
import "../../../css/discoveryQuestions/questions.css";




function EditQuestion({}){
    const {id} = useParams();
    const navigate = useNavigate();
    const {httpRequest} = useHttp();
    const {discoveryReducer, question, checkForErrors} = useDiscoveryQuestions();
    const [data, dispatch] = useReducer(discoveryReducer, question);
    const errors = useMemo(() => checkForErrors(data), [data]);
    
    function inputChange(e){
        const {name, value} = e.target;
        
        dispatch({
            type: name,
            payload: value
        })
    }


    useEffect(() => {

        const controller = new AbortController();
        console.log(id)
        const requestConfig = {
            url: `api/v1/discovery-questions/${id}`,
            method: "GET",
            data: null,
            signal : controller.signal
        }


        function applyData(res){
            console.log(res)
            if(res.status === 200){
                if(res.data){
                    dispatch({type: "update", payload: res.data})
                }
            }
        }

        (async () => {
            await httpRequest(requestConfig, applyData)
        })()

        return ()=>{}
    }, [])

    function submit(e){
        e.preventDefault();
        const configRequest={
            url : `api/v1/discovery-questions/${id}`,
            method : "PUT",
            data: data,
            headers:{
                "Content-Type": "application/json"
            }
        }

        function applyData(res){
            console.log(res)
            if(res.status === 200){
                navigate("/discoveryquestions")
            }
        }

        httpRequest(configRequest, applyData)   
    }

    return(
        <div className="container">
            <Header/>
            <div className="title_container">
                <h2>Edit Question</h2>
            </div>
            <div className="form_container">
                <QuestionForm data={data}
                            submit={submit}
                            onChange={inputChange}
                            errors={errors}/>
            </div>
        </div>
    )
}

export default EditQuestion;