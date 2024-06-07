import React, {useEffect, useMemo, useState} from "react";
import CategoryName from "./CategoryName";
import useISPCategory from "../../../hooks/useISPCategory";
import NewCategoryAction from "./NewCategoryAction";
import useHttp from "../../../hooks/useHttp";

function NewCategoryRow({id}){
    const {httpRequest} = useHttp();
    const {validateCategory} = useISPCategory();
    const [exists, setExists] = useState(false);
    const [category, setCategory] = useState({
        name:"",
        services:0,
    }); 

    function reset(){
        setCategory({
            name:"",
            services:0,
        });
    };
    
    const errors = useMemo(()=>validateCategory(category),[category]);

    function inputChange(e){;
        const {name, value} = e.target;
        
        if(name === "name"){
            if(value.length <= 100){
                const categoryObj = {...category};
                categoryObj[name] = value;
                setCategory(categoryObj)
            }
        }
        
    }
    
    useEffect(()=>{
        
        
        const checkNameInterval = setTimeout(()=>{

            if(category.name.length > 0){
                
                const configRequest = {
                    url: `api/v1/isp/category/validate/${category.name}`,
                    method: "GET"
                }
    
                function applyData(res){
                    
                    if(res.status === 200){
                        setExists(res.data);
                    }
                }
    
                (async()=>{
                    await httpRequest(configRequest, applyData);
                })();

            }else if(category.name.length === 0){
                
                setExists(false);

            }
        }, 100);

        

        return ()=>{
            clearTimeout(checkNameInterval);
            if(category.name.length === 0){
                setExists(false);
            }
        };

    },[category.name])

    return(
        <tr className="row_form">
            <CategoryName data={category.name}
                        name={'name'}
                        inputChange={inputChange}
                        errors={errors}
                        exists={exists}
                        />
            {/* <td></td> */}
            <NewCategoryAction
                data={category}
                reset={reset}
                errors={errors}
                id={id}
                />
        </tr>
    )
}

export default NewCategoryRow;