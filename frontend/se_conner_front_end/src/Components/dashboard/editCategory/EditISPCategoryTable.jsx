import React, {useEffect, useReducer} from "react";
import { Link } from "react-router-dom";
import EditISPCategoryTableHead from "./EditISPCategoryTableHead";
import EditISPCategoryTableBody from "./EditISPCategoryTableBody";
import useHttp from "../../../hooks/useHttp";
import { ispActions } from "../../../store/ispStore";
import useTextTransform from "../../../hooks/useTextTransform";
import { useDispatch, useSelector } from "react-redux";
function EditISPCategoryTable({id}){
    const {httpRequest} = useHttp();
    const {capitialize} = useTextTransform();
    const ispData = useSelector(state=>state.ispData);
    const dispatch = useDispatch();

    useEffect(()=>{

        const configRequest = {
            url: `api/v1/isp/${id}`,
            method: "GET"
        }

        function applyData(res){
            
            if(res.status === 200){

                dispatch(ispActions.setCategoryData(res.data));
            }
        }

        (async()=>{
            await httpRequest(configRequest, applyData);
        })()


    },[])
    
    

    return(
        <>
            <h1>{ispData.category.name.toUpperCase()}</h1>
            <div className="links">
                <Link to={"/sales/isp"}>Back to ISPs</Link>
            </div>
            
            <table>
                <EditISPCategoryTableHead/>
                <EditISPCategoryTableBody data={ispData.categoryData}
                                        id={id}
                                        />
            </table>
        </>
        
    )
}

export default EditISPCategoryTable;