import React, {useState} from "react";
import TextField from "../../../form/TextField";
import useTextTransform from "../../../../hooks/useTextTransform";



function CompanyTitle({data}){
    const [edit, setEdit] = useState(false);
    const {capitialize} = useTextTransform();
    const editName = () => setEdit(!edit);

    function sumbit(e){
        e.preventDefault();
    }


    return(
        <div>
            {!edit && <h1>{capitialize(data.name)}</h1>}
            {edit && <TextField value={data.name} onChange={(e)=>console.log(e.target.value)}/>}
        </div>
    )
}

export default CompanyTitle;