import React from "react";
import Button from "../../form/Button";



function AddToTemplate({disabled, templateId}){
    
    function onClick(e){
        e.PreventDefault();
        
    }

    return(
        <div>
            <Button disabled={disabled}
                    onClick={onClick}
                    label="Add to Template"
                    />
        </div>
    )
}

export default AddToTemplate;