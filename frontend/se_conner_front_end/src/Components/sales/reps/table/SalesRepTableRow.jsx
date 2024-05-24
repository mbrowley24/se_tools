import React, {useMemo, useState} from "react";
import {Link} from "react-router-dom";
import useSalesRep from "../../../../hooks/useSalesRep";
import RoleSelection from "../new/RoleSelection";
import TextField from "../../../form/TextField";
import EmailField from "../new/EmailField";
import Modal from "../../../form/Modal";
import DeleteSalesRep from "./DeleteSalesRep";

function SalesRepTableRow({rep, deleteRep}){
    
    const {addCommas, assmblySalesRepObj, hasChanged, phoneNumberFormat, validSalesRep} = useSalesRep();

    const [salesRep, setSalesRep] = useState({
        id: rep.id,
        first_name: rep.first_name,
        last_name: rep.last_name,
        email: rep.email,
        phone: rep.phone,
        role: rep.role,
        quota: rep.quota,
        sales_engineer: rep.sales_engineer
    })

    const resetRep = () => {
        setSalesRep({
            id: rep.id,
            first_name: rep.first_name,
            last_name: rep.last_name,
            email: rep.email,
            phone: rep.phone,
            role: rep.role,
            quota: rep.quota,
            sales_engineer: rep.sales_engineer
        })
    }

    const isValidSalesRep = useMemo(() => validSalesRep(salesRep), [salesRep]);
    const update = useMemo(() => hasChanged(salesRep, rep) , [salesRep, rep]);
    const [valid, setValid] = useState({
        email: false,
        role: false
    });


    function inputChange(e){
        //break down the event object
        const {name, value} = e.target;
        console.log(name, value)
        //create a new object with the new value
        const saleRepObj = assmblySalesRepObj(salesRep, value, name);
        //set state
        console.log(saleRepObj)
        setSalesRep(saleRepObj)
    }

   
    return(
        <>
            
            <tr key={rep.id}>
                <td><TextField name={"first_name"} value={salesRep.first_name} onChange={inputChange}/></td>
                <td><TextField name={"last_name"} value={salesRep.last_name} onChange={inputChange}/></td>
                <td><TextField value={`$${addCommas(salesRep.quota)}`} onChange={inputChange}/></td>
                <td><EmailField inputChange={inputChange} 
                                email={salesRep.email}
                                valid={valid}
                                setValid={setValid}
                                />
                </td>
                <td>{<TextField name={'phone'} value={phoneNumberFormat(salesRep.phone)} onChange={inputChange}/>}</td>
                <td><RoleSelection data={salesRep.role} 
                                    validIsRole={setValid}
                                    inputChange={inputChange}/></td>
                <td>{salesRep.sales_engineer}</td>
                <td>
                    {
                        update && <>
                        <button>Update</button>
                        <button onClick={resetRep}>Reset</button>
                        </> 
                    }
                    {
                        !update && <button onClick={()=>deleteRep(salesRep)}>Delete</button>
                    }
                </td>
            </tr>
            
        </>
        
    )
}

export default SalesRepTableRow;