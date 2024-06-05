import React, {useEffect, useMemo, useState} from "react";
import { Link } from "react-router-dom";
import CategoryName from "./CategoryName";
import useISPCategory from "../../../hooks/useISPCategory";
import CategoryActions from "./CategoryActions";
import { count } from "d3";



function EditISPCategoryTableRow({data}){
    const {validateCategory} = useISPCategory();
    const [category, setCategory] = useState({
        id:"",
        name:"",
        services:0,
    });

    const errors = useMemo(()=>validateCategory(category), [category]);

    useEffect(()=>{
        setCategory(data);
    },[data]);


    //input change handler
    function inputChange(e){
        const {name, value} = e.target;
        
        dispatchCategoryState({type: name, payload: value});
        
    }

    

    return(
        <tr>
            <CategoryName errors={errors} 
                        data={category.name}
                        name={"name"} 
                        inputChange={inputChange}/>
            <td><Link to={`/sales/isp/categories/${data.id}`}>{category.services}</Link></td>
            <CategoryActions data={data} 
                            category={category}
                            errors={errors}
                            />
        </tr>
    )
}


export default EditISPCategoryTableRow;