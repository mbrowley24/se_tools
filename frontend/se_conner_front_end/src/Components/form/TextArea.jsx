import React from "react";




function TextArea({class_list, label_class, value, label, onChange, name}){

    return(
        <>
            <label htmlFor=""
                className={label_class}
            >{label}</label>
            <textarea
                name={name}
                className={class_list}
                value={value}
                placeholder="Enter your question here..."
                rows={10}
                cols={5}
                onChange={(e)=>onChange(e)}
            ></textarea>
        </>
    )
}

export default TextArea;