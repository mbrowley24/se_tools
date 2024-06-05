import React, {useEffect, useMemo, useState} from "react";
import ServiceName from "./ServiceName";
import ServiceUrl from "./ServiceURL";
import useISPService from "../../../hooks/useISPService";
import NewISPServiceActions from "./NewISPSericeActions";


function NewISPService({data, id, addService}){
    const [ispService, setIspService] = useState({
        name: "",
        url: ""
    });
    const {checkService, newService, validateService} = useISPService();
    const errors = useMemo(() => validateService(ispService), [ispService]);
    const update = useMemo(() => newService(ispService) , [ispService]);
    
    function reset(){
        setIspService({
            name: "",
            url: ""
        })
    }

    useEffect(() => {
        if(data){
            setIspService({
                service: data.name,
                url: data.url
            })
        }
    }, [])

    function inputChange(e){
        const {name, value} = e.target;
        
        const serviceObj = {...ispService};
        setIspService(checkService(serviceObj, name, value));
        
    }
    
    return(
        <tr>
            <ServiceName data={ispService.name} errors={errors} inputChange={inputChange}/>
            <ServiceUrl data={ispService.url} errors={errors} inputChange={inputChange}/>
            <NewISPServiceActions data={ispService}
                                    errors={errors}
                                    id={id} 
                                    update={update} 
                                    reset={reset}
                                    addService={addService}
            />
        </tr>
    )
}

export default NewISPService;