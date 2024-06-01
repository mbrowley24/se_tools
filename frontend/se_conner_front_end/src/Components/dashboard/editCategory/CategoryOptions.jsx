import React, {useState} from "react";
import CategoryName from "./CategoryName";
import CategorySelection from "./CategorySelection";


function CategoryOptions({data}){
    const [editCateogry, setEditCateogry] = useState(false);

    return(
        <div>
            {editCateogry && <CategoryName data={data} />}
            {!editCateogry && <CategorySelection data={data} />}
        </div>
    )
}

export default CategoryOptions;