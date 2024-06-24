import React, {useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";
import TextField from "../../../form/TextField";
import TooltipError from "../../../form/ToolTipError";

function NameCell({value, inputChange, name, errors}){

    return(
        <td>
            <TextField name={name} value={value} onChange={inputChange}/>
            <p className="errors">{errors?  errors : ""}</p>
        </td>
    )
}

export default NameCell;