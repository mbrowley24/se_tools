import React, {useMemo, useState} from "react";
import useCompany from "../../../hooks/useCompany";
import TextField from "../../form/TextField";




function NewCompanyRow({}){
    const {checkName, checkForErrors, validName} = useCompany();
    const [name, setName] = useState('');
    
    const errors = useMemo(()=>{

        const error_list = checkForErrors(name);
        return error_list;

    }, [name]);

    function inputChange(e){
        
        const {value} = e.target;

        setName(checkName(name, value));
        
    }

    return(
        <tr>
            <td>
                <TextField value={name} onChange={inputChange} />
                {errors.name && <span>Invalid name</span>}
            </td>
            <td>
                <button disabled={Object.keys(errors).length > 0}
                    className="update"
                >
                    <span className="material-symbols-outlined">
                        save
                    </span>
                </button>
                <button className="reset">
                    <span className="material-symbols-outlined">
                        undo
                    </span>
                </button>
            </td>
            <td colSpan={'6'}></td>
        </tr>
    )
}

export default NewCompanyRow;