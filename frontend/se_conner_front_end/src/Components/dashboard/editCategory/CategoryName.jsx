import React, {useEffect, useState} from "react";
import TextField from "../../form/TextField";
import useHttp from "../../../hooks/useHttp";

function CategoryName({data, inputChange, errors, name, exists}){
    const {httpRequest} = useHttp();
    
    

    return(
        <td>
            <TextField type={'text'} name={name} value={data} onChange={inputChange} />
            {errors && errors.name && <p className="errors">{errors.name}</p>}
            {exists && <p className="errors">Category already exists</p>}
        </td>
    )
}

export default CategoryName;