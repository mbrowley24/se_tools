import React, {useMemo} from "react";
import {useNavigate} from "react-router-dom";
import useForecast from "../../../../hooks/useForecast";
import useHttp from "../../../../hooks/useHttp";

function AddOpportunityToolBar({data, id={id}, rep_id={rep_id}}){
    const {checkOppStatus} = useForecast();
    const {httpRequest} = useHttp();
    const disable = useMemo(()=> checkOppStatus(data.original_opps, data.current_opps),[data.current_opps]);
    const navigate = useNavigate();
    const back = () => navigate(-1);

    function save(e){
        e.preventDefault();

        const configRequest = {
            url : `api/v1/forecasts/${id}/sales-rep/${rep_id}/opportunities`,
            method: "POST",
            data: data.current_opps
        }

        function applyData(res){
            
            if(res.status === 200){
                back();
            }

        }

        (async()=>{
            await httpRequest(configRequest, applyData);
        })();
    }
    
    return(
        <div className="tool_bar">
            <button className="back_button" 
                onClick={()=> back()}
            >Cancel</button>
            <button className="add_element"
                disabled={disable}
                onClick={(e)=>save(e)}
            >Save</button>
        </div>
    )
}

export default AddOpportunityToolBar;