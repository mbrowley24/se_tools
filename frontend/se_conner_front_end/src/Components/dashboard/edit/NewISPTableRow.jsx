import React, {useEffect, useMemo, useState} from "react";
import NewISPName from "./NewISPName";
import NewISPURL from "./NewISPURL";
import NewISPMaps from "./NewISPMaps";
import NewISPActions from "./NewISPActions";
import useISP from "../../../hooks/useISP";
import "../../../css/table/table_form.css";

function NewISPTableRow({dispatch, actions}) {
    const {checkForErrors, ispObjFilter, duplicateMap, duplicateName, duplicateURL} = useISP(); 
    const [categoryExists, setCategoryExists] = useState(false);
    const [urlExists, setUrlExists] = useState(false);
    const [mapExists, setMapExists] = useState(false);

    const [isp, setIsp] = useState({
        name: "",
        url: "",
        maps: ""
    });
    
    const errors = useMemo(()=>{
        let errorMap = checkForErrors(isp)
        errorMap = duplicateName(categoryExists, errorMap);
        errorMap = duplicateURL(urlExists, errorMap);
        errorMap = duplicateMap(mapExists, errorMap);
        
        return errorMap;
    }, [isp, categoryExists, urlExists, mapExists]);

    function inputChange(e){

        const {value, name} = e.target;
        const ispObj = {...isp};
        setIsp(ispObjFilter(name, value, ispObj));
    }
    
    const reset = () => setIsp({
        name: "",
        url: "",
        maps: ""
    });

    
    
    return (
        <tr>
            <NewISPName data={isp.name} 
                inputChange={inputChange} 
                errors={errors} 
                exists={categoryExists} 
                setExists={setCategoryExists}
                />
            <NewISPURL data={isp.url}
                        inputChange={inputChange}
                        errors={errors}
                        setExists={setUrlExists}
                        />
            <NewISPMaps 
                data={isp.maps}
                inputChange={inputChange}
                errors={errors}
                exists={mapExists}
                setExists={setMapExists}
                />
            <NewISPActions isp={isp} reset={reset} errors={errors} dispatch={dispatch} actions={actions}/>
        </tr>
    )
}


export default NewISPTableRow;