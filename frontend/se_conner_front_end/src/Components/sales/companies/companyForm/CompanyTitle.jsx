import React, {useState} from "react";
import TextField from "../../../form/TextField";




function CompnayTitle({data}){
    const [edit, setEdit] = useState(false);

    const editName = () => setEdit(!edit);

    function sumbit(e){
        e.preventDefault();
    }

    return(
        <div>
            {!edit && <h1>{data.name}</h1>}
            {edit && <TextField value={data.name} onChange={(e)=>console.log(e.target.value)}/>}
        </div>
    )
}

export default CompnayTitle;