import React, {useEffect, useMemo, useState} from "react";
import ServiceName from "./ServiceName";
import ServiceUrl from "./ServiceURL";
import UpdateISPService from "./UpdateISPService";
import useISPService from "../../../hooks/useISPService";




function EditISPServicesTableRow({data, id, addService}){
    const [reset, setReset] = useState(false)
    const {updateService, validateService} = useISPService();
    const [service, setService] = useState({
        id: "",
        name: "",
        url: ""
    });
    const update = useMemo(() =>updateService(data, service), [service])
    const errors = useMemo(() => validateService(service), [service])
    
    useEffect(() => {
        
        if(data){
            setService({
                id: data.id,
                name: data.name,
                url: data.url
            })
        
        }
    }, [data, reset])
    

    function inputChange(e){
        const {name, value} = e.target;
        
        setService({...service, [name]: value})
    }

    const resetService = () => setReset(!reset)
    

    return(
        <tr>
            <ServiceName data={service.name} inputChange={inputChange} errors={errors}/>
            <ServiceUrl data={service.url} inputChange={inputChange} errors={errors} />
            <UpdateISPService 
                data={service}
                id={id}
                update={update}
                addService={addService}
                reset={resetService}
                />        
        </tr>
    )
}

export default EditISPServicesTableRow;