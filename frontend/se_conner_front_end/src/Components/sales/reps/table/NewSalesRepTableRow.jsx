import React, {useMemo, useState} from "react";
import NameCell from "./NameCell";
import useSalesRep from "../../../../hooks/useSalesRep";
// import "../../../../css/salesrep/newsalesrep.css"
import QuotaCell from "./QuotaCell";
import EmailCell from "./EmailCell";
import PhoneCell from "./PhoneCell";
import RoleCell from "./RoleCell";
import NewRepsCell from "./NewRepsCell";



function NewSalesRepTableRow({}){
    const {updateDateSalesRep, validateSalesRep} = useSalesRep();
    const [salesRep, setSalesRep] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "",
        quota: 0
    })
    const errors = useMemo(() => (validateSalesRep(salesRep)), [salesRep])
    const reset = () => setSalesRep({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "",
        quota: 0
    })


    function inputChange(e){
        
        const salesRepObj = updateDateSalesRep(salesRep,e);

        setSalesRep(salesRepObj)
        
    }

    
    return(
        <tr id={"new_rep"} >
            <NameCell value={salesRep.first_name}
                    name={'first_name'} 
                    inputChange={inputChange}
                    errors={errors['first_name']}/>
            <NameCell value={salesRep.last_name} 
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
            <NewRepsCell reset={reset} errors={errors} data={salesRep}/>
        </tr>
    )
}

export default NewSalesRepTableRow;