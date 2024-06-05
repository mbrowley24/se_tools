import React, {useMemo} from "react";
import useISPCategory from "../../../hooks/useISPCategory";
import useHttp from "../../../hooks/useHttp";


function CategoryActions({data, category ,inputChange, errors}){
    const {checkCategory} = useISPCategory();
    const hasErrors = useMemo(()=>{ errors && Object.keys(errors).length === 0}, [errors]);
    const edited = useMemo(()=> checkCategory(data, category), [category]);
    const {httpRequest} = useHttp();


    function submit(e){
        e.preventDefault();
        
        const configRequest = {
            url: "/category/update",
            method: "POST",
            data: category
        }


        function applyData(res){
            console.log(res);
        }


        (async () => {
            await httpRequest(configRequest, applyData);
        })();
    }

    return(
        <td>
            <button
                className="actions update" 
                disabled={edited || hasErrors}
                onClick={submit}
            >Update</button>
        </td>
    )
}

export default CategoryActions;