import React, {useEffect} from "react";
import TextField from "../../form/TextField";
import useHttp from "../../../hooks/useHttp";

function NewISPMaps({data, inputChange, errors, setExists, exists}) {
    const {httpRequest} = useHttp();
    
    useEffect(()=>{

        if(exists === null || exists === undefined) return

        const checkMaps  = setTimeout(()=>{
            
            const configRequest = {
                url: `api/v1/isp/validate/check/map?map=${data}`,
                method: "GET"
            }

            function applyData(res){
                // console.log(res);
                if(res.status === 200){
                    
                    setExists(res.data);
                }
            }
    

            (async()=>{
                await httpRequest(configRequest, applyData);
            })();

        }, 100);
    

        return () => {
            clearTimeout(checkMaps);
        }

    },[data]);
    
    return(
        <td>
            <TextField type={'text'} name={"maps"} value={data} onChange={inputChange} />
            {errors.maps && <p className="errors">{errors.maps}</p>}
        </td>
    )
}


export default NewISPMaps;