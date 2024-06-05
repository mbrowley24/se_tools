import React, {useEffect, useState} from "react";
import TextField from "../../form/TextField";
import useHttp from "../../../hooks/useHttp";

function NewISPName({data, inputChange, errors, exists, setExists}) {
    const {httpRequest} = useHttp();
    const [name, setName] = useState("");
    
    useEffect(()=>{
        if(name.length === 0){
            setName(data);
        }
    },[data]);

    useEffect(()=>{

        if(data.length === 0){
            setExists(false);
            return;
        }
        
        const checkNameInterval = setTimeout(()=>{
            
            const configRequest = {
                url: `api/v1/isp/validate/${data}`,
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
            clearInterval(checkNameInterval);
        }
    },[data]);

    return(
        <td>
            <TextField type={'text'} name={"name"} value={data} onChange={inputChange} />
            {errors.name && <p className="errors">{errors.name}</p>}
            {errors.nameExists && <p className="errors">Category already exists</p>}
        </td>
    )
}

export default NewISPName;