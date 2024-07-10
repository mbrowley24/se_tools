import React, {useEffect, useState} from "react";
import useHttp from "../../../hooks/useHttp";
import Select from "../../form/Select";

function Category({onChange, value, name, error}){
    const {httpRequest} = useHttp();
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        
        const controller = new AbortController();

        const requestConfig = {
            url: "api/v1/categories",
            method: "GET",
            signal: controller.signal
        }

        function applyData(res){
            if(res.status === 200){
                setCategories(res.data);
            }
        }

        (async()=>{

            await httpRequest(requestConfig, applyData);
        })();


        return ()=>{
            controller.abort();
        }

    },[])

    return(
        <div>
            <label>Categories</label>
            <Select options={categories}
                    multiple={true} 
                    value={value}
                    name={name}
                    onChange={onChange}/>
            <p className="error">{error? error : ""}</p>
        </div>
    )
}

export default Category;