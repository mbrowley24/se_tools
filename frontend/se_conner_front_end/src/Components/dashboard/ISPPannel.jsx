import React from "react";
import ISPTitle from "./ISPTitle";
import ISPCategory from "./ISPCategory";


function ISPPannel({data}){
    
    return(
        <div className="isp_panel">
            <ISPTitle data={data}/>
            <div className="isp">
                
                {
                    data.categories.map((category, index)=>{
                        
                        return <ISPCategory key={index} data={category}/>
                    })
                }{
                    data.categories.length === 0 && <div className="">No categories Listed</div>
                }
            </div>
        </div>
    )
};
export default ISPPannel