import React, {useEffect, useMemo, useState} from "react";
import QuestionHeader from "./QuestionHeader";
import QuestionBody from "./QuestionBody";
import Modal from "../../form/Modal";
import DeleteLargeTextComponent from "../../form/DeleteLargeTextComponent";
import useHttp from "../../../hooks/useHttp";


function Question({data, dispatch}){
    const [question, setQuestion] = useState({
        "author": "",
        "id": "",
        "question": "",
    });

    const {httpRequest} = useHttp();
    const [show, setShow] = useState(false);
    
    const toggleModal = () => setShow(!show);

    

    function deleteAction(e){
        e.preventDefault();
        const configRequest={
            url : `api/v1/discovery-questions/${data.id}`,
            method : "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        }

        function applyData(res){
            
            if(res.status === 200){
                console.log(res.status)
                dispatch({type: "load_page", payload: res.data})
                toggleModal()
            }
        }

        httpRequest(configRequest, applyData)

    }

    useEffect(() => {

        if(data){
            setQuestion(data)
        }

    }, [data])
    
    return(
        <div className="question_container">
            <QuestionHeader data={question} modal={toggleModal}/>
            <QuestionBody data={question} />
            <Modal isOpen={show} 
                        onClose={toggleModal} 
                        children={<DeleteLargeTextComponent 
                                    data={data.question} 
                                    onClose={toggleModal}
                                    deleteAction={deleteAction}/>}
                />
        </div>
    )

}

export default Question;