import React, {useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";
import TextField from "../../../form/TextField";
import TooltipError from "../../../form/ToolTipError";

function NameCell({value, inputChange, name, errors, edit}){

    return(
        <td>
            {
                edit?
                <>
                    <TextField name={name} value={value} onChange={inputChange}/>
                    <p className="errors">{errors?  errors : ""}</p>
                </>
                :
                
                value
            }
           
        </td>
    )
}

export default NameCell;