import React from "react";





function useTextTransform(){

    function capitialize(text){

        if(!text || text.length === 0) return text;

        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    return({
        capitialize
    });
}

export default useTextTransform;

