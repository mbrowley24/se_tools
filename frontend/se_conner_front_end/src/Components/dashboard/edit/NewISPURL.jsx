import React, {useEffect} from "react";
import TextField from "../../form/TextField";
import useHttp from "../../../hooks/useHttp";

function NewISPURL({data, inputChange, errors, setExists}) {
    const {httpRequest} = useHttp();

    useEffect(() => {

        const urlcheck = setTimeout(()=>{

            const configRequest ={
                url: `api/v1/isp/validate/check/url?url=${data}`,
                method: "GET",
            }
    
            function applyData(res){
                
                if(res.status === 200){
                    setExists(res.data);
                }
            }
    
    
            (async () => {
                await httpRequest(configRequest, applyData)
            })()

        }, 100);

        return () => {
            clearTimeout(urlcheck);
        }

    }, [data])



    

    return(
        <td>
            <TextField type={'text'} name={'url'} value={data} onChange={inputChange} />
            {errors.url && <p className="errors">{errors.url}</p>}
            
        </td>
    )
}

export default NewISPURL;