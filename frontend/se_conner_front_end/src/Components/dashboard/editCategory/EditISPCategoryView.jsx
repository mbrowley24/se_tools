import React from "react";
import Header from "../../header/Header";
import EditISPCategoryTable from "./EditISPCategoryTable";
import CategoryOptions from "./CategoryOptions";


function EditISPCategoryView({data}){

    return(
        <div>
            <Header />
            <div>
                <CategoryOptions data={data} />
                <EditISPCategoryTable />
            </div>
        </div>
    )
}

export default EditISPCategoryView;