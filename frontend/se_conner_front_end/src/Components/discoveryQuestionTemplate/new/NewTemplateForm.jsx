import React, {useMemo, useState} from "react";
import useHttp from "../../../hooks/useHttp";
import useTemplate from "../../../hooks/useTemplate";

function NewTemplateForm({setUpdate}){

    const {httpRequest} = useHttp();
    const {validateNameInput, validateName} = useTemplate();
    const [name, setName] = useState("");
    const valid = useMemo(()=> validateName(name), [name]);
    
    function inputChange(e){
        const {value} = e.target;
        
        if(validateNameInput(value)){
            setName(value);
        }
    }   

    function resetForm(){
        setName("");
        setUpdate((prev)=>!prev);
    }


    async function submitForm(e){
        e.preventDefault()
        
        const configRequest={
            method: 'POST',
            url: '/api/v1/discovery-question-templates',
            data: {name : name}
        }

        function applyData(res){
            console.log(res)
            if (res.status === 200) {
                resetForm();
            }
        }

        await httpRequest(configRequest, applyData)
        
    }

    return(
        <form onSubmit={submitForm}>
            <div className="new_template_name">
                <input type="text"
                    name="name"
                    value={name}
                    onChange={(e)=>inputChange(e)}
                />
            </div>
            <div className="new_template_submit">
                <button type="submit"
                    disabled={!valid}
                >New Template</button>
            </div>
        </form>
    )
}

export default NewTemplateForm;