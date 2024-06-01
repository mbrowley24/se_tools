import React, {useState} from "react";
import TextField from "../../form/TextField";



function CategoryName({data}){
    const [categoryName, setCategoryName] = useState("");
    
    function inputChange(e){
        setCategoryName(e.target.value);
    }
    return(
        <>
            <TextField type={'text'} value={categoryName} onChange={inputChange} />
            <button>Update</button>
        </>
    )
}

export default CategoryName;