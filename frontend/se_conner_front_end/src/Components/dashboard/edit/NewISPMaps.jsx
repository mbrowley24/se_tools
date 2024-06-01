import React from "react";
import TextField from "../../form/TextField";
import useISP from "../../../hooks/useISP";

function NewISPMaps({isp, inputChange}) {
    const {FIELDS} = useISP();

    
    return(
        <td>
            <TextField type={'text'} name={FIELDS.MAPS} value={isp.maps} onChange={inputChange} />
        </td>
    )
}


export default NewISPMaps;