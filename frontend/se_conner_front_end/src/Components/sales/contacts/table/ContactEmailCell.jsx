import React, {useEffect} from "react";
import TextField from "../../../form/TextField";
import useHttp from "../../../../hooks/useHttp";


function ContactEmailCell({data, name, inputChange, isUnique}){
    const {httpRequest} = useHttp();

    useEffect(()=>{

        if(data.length === 0) return;

        const checkEmail = setTimeout(()=>{

            const configRequest = {
                url: `api/v1/contacts/check/email/${data}`,
                method: 'GET',
            };

            function applyData(res){
                console.log(res);
                if(res.status === 200){
                    isUnique(!res.data);
                }
            }

            (async () => {
                await httpRequest(configRequest, applyData);
            })();

        }, 100);

        return ()=>{
            clearTimeout(checkEmail);
        }

    }, [data]);

    return(
        <td>
            <TextField name={name} value={data} onChange={inputChange} />
        </td>
    )
}

export default ContactEmailCell;