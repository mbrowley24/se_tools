import React from "react";
import ISPServices from "./ISPServices";



function ISPCategory({data}){
    
    return(
        <div>
            <h3 className="category_name">{data.name}</h3>
            <div className="isp_category">
                <ISPServices data={data.services}/>
            </div>
        </div>
        
    )
}

export default ISPCategory