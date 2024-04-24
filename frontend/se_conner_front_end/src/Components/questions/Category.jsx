import React, {useEffect, useState} from "react";
import useHttp from "../../hooks/useHttp";
import Select from "../form/Select";

function Category({onChange, value, name}){
    const {httpRequest} = useHttp();
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        
        const controller = new AbortController();

        const requestConfig = {
            url: "api/v1/category",
            method: "GET",
            signal: controller.signal
        }

        function applyData(res){
            
            if(res.data.data){
                setCategories(res.data.data);
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
            <Select options={categories}
                    multiple={true} 
                    value={value}
                    name={name}
                    onChange={onChange}/>
        </div>
    )
}

export default Category;