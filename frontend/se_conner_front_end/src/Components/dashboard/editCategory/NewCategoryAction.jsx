import React, {useMemo} from "react";
import useHttp from "../../../hooks/useHttp";
import { ispActions } from "../../../store/ispStore";
import { useDispatch } from "react-redux";


function NewCategoryAction({data,  valid, id}){
    const {httpRequest} = useHttp();
    const dispatch = useDispatch();

    function submit(e){
        e.preventDefault();
        const configRequest = {
            url: `api/v1/isp/${id}`,
            method: "POST",
            data: data
        }
        
        function applyData(res){
            if(res.status === 200){
                dispatch(ispActions.addCategory(res.data));
            }
        }

        (async()=>{
            await httpRequest(configRequest, applyData);
        })()
    }

    return(
        <td colSpan={3}>
            <button className="actions update"
                disabled={!valid}
                onClick={(e)=>submit(e)}
            >Create</button>
            <button className="actions">Reset</button>
        </td>
    )
}

export default NewCategoryAction;