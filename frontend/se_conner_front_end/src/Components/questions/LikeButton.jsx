import React from "react";
import Button from "../form/Button";
import useHttp from "../../hooks/useHttp";
import "../../css/small_spinner.css";


function LikeButton({url, label, question_id, like, setQuestion, disabled}){
    const {httpRequest, isLoading} = useHttp();

    async function onClick(e){
        console.log("clicked")
        const requestConfig = {
            url: url,
            method: "POST",
            data: {
                liked: like,
                id: question_id
            },
            signal: null
        }

        function applyData(res){
            console.log(res)
            if(res.status === 200){

                setQuestion(res.data.data)
                
            }
            
        }

        await httpRequest(requestConfig, applyData)
    }

    return(
        <div>
            { isLoading &&  <div className="loader"></div>}
            { !isLoading && <Button disabled={disabled}  onClick={onClick} label={label}/>}

        </div>
    )
}

export default LikeButton;