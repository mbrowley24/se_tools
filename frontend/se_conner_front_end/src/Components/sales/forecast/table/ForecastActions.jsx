import React, {useMemo} from "react";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../../../form/DeleteButton";
import SaveButton from "../../../form/SaveButton";
import useHttp from "../../../../hooks/useHttp";



function ForecastActions({change, data, deleteAction, dispatch, edit, toogle, errors}){
    const navigate = useNavigate();
    const {httpRequest} = useHttp();
    const invalid = useMemo(()=>{

        const hasErrors = Object.keys(errors).length > 0;
        return change && hasErrors;

    }, [errors]);
        

    function save(e){
        e.preventDefault();

        const configRequest = {
            url: `api/v1/forecasts/${data.id}`,
            method: "PUT",
            data: data
        }

        function applyData(res){
            
            if(res.status === 200){
                dispatch({type: "update_forecast", payload: data})
                toogle();
            }
        }

        (async()=>{
            await httpRequest(configRequest, applyData);
        })()
    }

    return(
        <td>
            {
                <>
                    {
                        !edit?
                        <>
                            <button className="edit" onClick={()=>toogle()}>
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </button>
                            <DeleteButton deleteAction={deleteAction}/>
                        </>
                        :
                        <>
                            <button className="edit" onClick={()=>toogle()}>
                                <span className="material-symbols-outlined">
                                    restart_alt
                                </span>
                            </button>
                            <SaveButton disable={invalid} save={save}/>
                        </>
                        
                    }
                </>
                
            }
        </td>
    )
}

export default ForecastActions;