import React, {useEffect, useState} from "react";
import useTemplate from "../../hooks/useTemplate";
import TextField from "../form/TextField";
import useHttp from "../../hooks/useHttp";

function EditTemplateName({data, id}){
    const {httpRequest} = useHttp();
    const {validateNameInput} = useTemplate();
    const [name, setName] = useState({
        name: '',
        edit: false
    });
    
    function editNameAction(){
        const nameObj = {...name};
        nameObj.edit = !nameObj.edit;
        setName(nameObj);
    };

    useEffect(() => {

        if(data.name){
            
            const nameObj = {...name};
            nameObj.name = data.name;
            setName(nameObj);
        }

    }, [data.name]);
    

    function inputChange(e){
        
        if(validateNameInput(e.target.value)){
            const nameObj = {...name};
            nameObj.name = e.target.value;
            setName(nameObj);
        }
    }

    function submitName(e){
        e.preventDefault()

        const configRequest = {
            url:`api/v1/questions/templates/${id}/name`,
            method: 'POST',
            data: {
                name: name.name
            }
        };

        function applyData(res){

            if(res.status === 200){
                console.log(res.data.data);
                const nameObj = {...name};
                nameObj.edit = false;
                nameObj.name = res.data.data;
                setName(nameObj);
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();
    }

    return(
        <div className="template_name">
            {!name.edit && 
                <h4 className="">
                {name && name.name.length > 0? name.name.charAt(0).toUpperCase() + name.name.slice(1) : ""}
                <button
                    className="edit_action"
                    onClick={() => editNameAction()}
                    >edit</button>
                </h4>
            }
            {name.edit && <>
                        <TextField value={name.name} onChange={inputChange}/>
                        <button
                            className="save_name"
                            onClick={(e) => submitName(e)}
                        >
                            save
                        </button>
                        <button
                            className="save_name"
                            onClick={() => editNameAction()}
                            >cancel</button>
                        </> 
            }
        </div>
    )
}

export default EditTemplateName;