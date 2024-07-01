import React, {useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";
import TextField from "../../../form/TextField";
import TooltipError from "../../../form/ToolTipError";

function PhoneCell({value, inputChange, name, errors}){
    const {phoneNumberFormat} = useSalesRep();

    return(
        <td>
            
            <TextField name={name} value={phoneNumberFormat(value)} onChange={inputChange}/>
            <p className="errors">{errors?  errors : ""}</p>
        </td>
    )
}

export default PhoneCell;