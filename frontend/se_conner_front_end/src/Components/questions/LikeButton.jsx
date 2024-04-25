import React from "react";
import Button from "../form/Button";
import useHttp from "../../hooks/useHttp";



function LikeButton({url, label, question_id, like}){
    const {httpRequest} = useHttp();

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
        }

        await httpRequest(requestConfig, applyData)
    }

    return(
        <div>
            
            <Button onClick={onClick} label={label}/>
        </div>
    )
}

export default LikeButton;