import React from "react";
import TextField from "../../form/TextField";
import useISP from "../../../hooks/useISP";

function NewISPURL({isp, inputChange, errors}) {
    const {FIELDS} = useISP();

    

    return(
        <td>
            <TextField type={'text'} name={'url'} value={isp.url} onChange={inputChange} />
            {errors.url && <p>{errors.name}</p>}
        </td>
    )
}

export default NewISPURL;