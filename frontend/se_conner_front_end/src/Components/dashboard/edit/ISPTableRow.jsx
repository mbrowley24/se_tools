import React, {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import NewISPName from "./NewISPName";
import NewISPURL from "./NewISPURL";
import NewISPMaps from "./NewISPMaps";
import UpdateISP from "./UpdateISP";
import useISP from "../../../hooks/useISP";

function ISPTableRow({isp, dispatch, actions}) {
    
    const [categoryExists, setCategoryExists] = useState(false);
    const [urlExists, setUrlExists] = useState(false);
    const [mapExists, setMapExists] = useState(false);
    const {checkForErrors, ispObjFilter, ispUpdate,
        duplicateNameCurrentValue, duplicateNameCurrentMap, duplicateNameCurrentUrl} = useISP();
    const [ispData, setIspData] = useState({
        id:"",
        name:"",
        url:"",
        maps:"",
        categories:0,
    });

    
    const errors = useMemo(()=>{
        let errorMap = checkForErrors(ispData);
        errorMap = duplicateNameCurrentValue(isp.name, ispData.name, categoryExists, errorMap);
        errorMap = duplicateNameCurrentMap(isp.maps, ispData.maps, mapExists, errorMap);
        errorMap = duplicateNameCurrentUrl(isp.url, ispData.url, urlExists, errorMap);
        
        return errorMap;

    }, [ispData]);

    const updateISP = useMemo(()=>ispUpdate(isp, ispData), [ispData]);
    

    useEffect(() => {
        setIspData(isp)
    }, [isp])

    function inputChange(e){
        const {value, name} = e.target;
        
        const ispObj = {...ispData};
        setIspData(ispObjFilter(name, value, ispObj));
    }
    

    return(
        <tr>
            <NewISPName data={ispData.name} 
                        inputChange={inputChange} 
                        errors={errors}
                        setExists={setCategoryExists}
                        />
            <NewISPURL data={ispData.url}
                        inputChange={inputChange} 
                        errors={errors}
                        setExists={setUrlExists}
                        />
            <NewISPMaps data={ispData.maps} inputChange={inputChange} errors={errors} />
            <td><Link to={`/sales/isp/${ispData.id}`}>{ispData.categories}</Link></td>
            <UpdateISP
                    update={updateISP}
                    dispatch={dispatch}
                    actions={actions}
                    data={ispData}
                    />
        </tr>
    )
}

export default ISPTableRow;