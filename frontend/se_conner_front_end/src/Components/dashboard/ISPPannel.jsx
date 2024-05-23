import React from "react";
import ISPTitle from "./ISPTitle";
import ISPServices from "./ISPServices";


function ISPPannel({data}){
    
    return(
        <div className="isp_panel">
            <div className="isp">
                <ISPTitle data={data}/>
                <ISPServices data={data.categories}/>
            </div>
        </div>
    )
};
export default ISPPannel