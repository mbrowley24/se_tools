import React from "react";
import Button from "../form/Button";
import useHttp from "../../hooks/useHttp";

function CommentButton({url, data, label}){
    const {httpRequest} = useHttp();

    async function onClick(e){
        e.PreventDefault();
        const requestConfig = {
            url: url,
            method: "POST",
            data: {
                id: data.id
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

export default CommentButton;