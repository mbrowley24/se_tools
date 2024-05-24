import React, {useMemo} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";
import TextField from "../../../form/TextField";
import TooltipError from "../../../form/ToolTipError";

function NameCell({value, inputChange, name}){
    const {nameValidation} = useSalesRep();
    const validName = useMemo(() => nameValidation(value) || value === "", [value])
    return(
        <td>
            <TooltipError text="Must be between 2 and 75 Charters" show={!validName}>
                <TextField name={name} value={value} onChange={inputChange}/>
            </TooltipError>
        </td>
    )
}

export default NameCell;