import React, {useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";
import TextField from "../../../form/TextField";
import TooltipError from "../../../form/ToolTipError";

function PhoneCell({value, inputChange, name, errors, edit}){
    const {phoneNumberFormat} = useSalesRep();

    return(
        <td>
            {
                edit?
                    <>
                        <TextField name={name} value={phoneNumberFormat(value)} onChange={inputChange}/>
                        <p className="errors">{errors?  errors : ""}</p>
                    </>
                    :
                    phoneNumberFormat(value)
            }
            
        </td>
    )
}

export default PhoneCell;