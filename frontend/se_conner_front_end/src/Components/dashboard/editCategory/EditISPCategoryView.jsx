import React, {useReducer} from "react";
import { useParams } from "react-router-dom";
import Header from "../../header/Header";
import EditISPCategoryTable from "./EditISPCategoryTable";
import '../../../css/table/table.css'

function EditISPCategoryView({}){
    const {id} = useParams();
    
    return(
        <div>
            <Header/>
            <div className="container">
                <EditISPCategoryTable id={id}/>
            </div>
        </div>
    )
}

export default EditISPCategoryView;