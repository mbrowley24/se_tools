import React, {useEffect, useMemo, useState} from "react";
import useSalesRep from "../../../../hooks/useSalesRep";
import EmailCell from "./EmailCell";
import NameCell from "./NameCell";
import PhoneCell from "./PhoneCell";
import QuotaCell from "./QuotaCell";
import RoleCell from "./RoleCell";
import SalesRepActions from "./SalesRepActions";
import useTextTransform from "../../../../hooks/useTextTransform";

function SalesRepTableRow({rep}){
    const {capitialize} = useTextTransform();
    const {hasChanged, updateDateSalesRep, validateSalesRep} = useSalesRep();
    const [salesRep, setSalesRep] = useState({
        id: rep.id,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "",
        quota: 0,
        sales_eng: null
    })
    
    const errors = useMemo(() => validateSalesRep(salesRep), [salesRep]);
    const resetRep = () => {
        setSalesRep({
            id: rep.id,
            first_name: rep.first_name,
            last_name: rep.last_name,
            email: rep.email,
            phone: rep.phone,
            role: rep.role,
            quota: rep.quota,
            sales_engineer: {...rep.sales_eng}
        })
    }
    
    useEffect(() => {

        
        if(rep){
            setSalesRep({
                id: rep.id,
                first_name: rep.first_name,
                last_name: rep.last_name,
                email: rep.email,
                phone: rep.phone,
                role: rep.role,
                quota: rep.quota,
                sales_engineer: {...rep.sales_eng},
            })
        }           
        
    }, [rep])

    const update = useMemo(() => hasChanged(salesRep, rep) , [salesRep, rep]);
    


    function inputChange(e){
        //break down the event object
        const {name, value} = e.target;
        console.log(name, value)
        //create a new object with the new value
        const saleRepObj = updateDateSalesRep(salesRep,e);
        //set state
        
        setSalesRep(saleRepObj)
    }
    
    return(
        
        <tr>
            <NameCell value={capitialize(salesRep.first_name)}
                name={'first_name'} 
                inputChange={inputChange}
                errors={errors['first_name']}/>
            <NameCell value={capitialize(salesRep.last_name)} 
                        name={"last_name"}
                        inputChange={inputChange}
                        errors={errors['last_name']}
                        />
            <QuotaCell value={salesRep.quota}
                        name={"quota"} 
                        inputChange={inputChange}
                        errors={errors['quota']}
                        />
            <EmailCell value={salesRep.email}   
                        name={"email"}
                        inputChange={inputChange}
                        errors={errors['email']}
                        />
            <PhoneCell value={salesRep.phone} name={"phone"} inputChange={inputChange}/>
            <RoleCell value={salesRep.role} inputChange={inputChange} />
            <SalesRepActions data={salesRep} errors={errors} update={update} resetRep={resetRep}/>
        </tr>
        
    )
}

export default SalesRepTableRow;