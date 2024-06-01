import React from "react";






function CategorySelection({data, inputChange}){

    return(
        <>
            <select name="">
                {
                    data.map((item, index) => {
                        return <option key={index} value={item.value}>{item.name}</option>
                    })
                }
            </select>
        </>
    )
}

export default CategorySelection;