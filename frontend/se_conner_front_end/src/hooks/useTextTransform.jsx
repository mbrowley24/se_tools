import {addCommas} from "../helper/general"





function useTextTransform(){

    function capitialize(text){

        if(!text || text.length === 0) return text;

        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    function capitalizeName(name){
        if(!name || name.length === 0) return name;

        const nameArray = name.split(", ");
        const capitializedArray = nameArray.map((word)=>{
            return capitialize(word);
        });

        return capitializedArray.join(", ");
    }

    function valueCommas(value){

        return addCommas(value);
    }

    

    return({
        capitialize,
        capitalizeName,
        valueCommas
    });
}

export default useTextTransform;

