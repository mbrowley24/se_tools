import React, {useMemo, useState} from "react";
import RoleSelection from "../new/RoleSelection";



function RoleCell({value, inputChange,  errors, edit}){
    const [roleValid, setRoleValid] = useState(true)
    



    return(
        <td>
            <RoleSelection data={value} inputChange={inputChange} validIsRole={setRoleValid} edit={edit}/>
            <p className="errors">{errors?  errors : ""}</p>
        </td>
    )
}

export default RoleCell;