import React from "react";
import TextField from "../../form/TextField";
import useISP from "../../../hooks/useISP";

function NewISPName({isp, inputChange, errors}) {
    const {FIELDS} = useISP();
    
    return(
        <td>
            <TextField type={'text'} name={FIELDS.NAME} value={isp.name} onChange={inputChange} />
            {errors.name && <p>{errors.name}</p>}
        </td>
    )
}

export default NewISPName;