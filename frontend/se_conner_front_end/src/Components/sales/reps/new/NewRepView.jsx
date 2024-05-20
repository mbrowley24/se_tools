import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../header/Header";
import NewRepForm from "./NewRepForm";
import useHttp from "../../../../hooks/useHttp";
import useSalesRep from "../../../../hooks/useSalesRep";
import "../../../../css/salesrep/newsalesrep.css"


function NewRepView({}){
    const navigate = useNavigate();
    const {httpRequest} = useHttp();
    const {assmblySalesRepObj, formatForBackend} = useSalesRep();
    const [salesRep, setSalesRep] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "",
        quota: ""
    })

    function inputChange(e){
        //break down the event object
        const {name, value} = e.target;
        //create a new object with the new value
        const saleRepObj = assmblySalesRepObj(salesRep, value, name);
        

        //set state
        setSalesRep(saleRepObj)
    }

    async function submit(e){
        e.preventDefault();

        let salesRepObj = {...salesRep};
        salesRepObj = formatForBackend(salesRepObj);

        const configRequest={
            url: "api/v1/sales/reps",
            method: "POST",
            data: salesRepObj
        }

        function applyData(res){
            
            if(res.status === 200){
                navigate("/sales/reps")
            }
        }

        await httpRequest(configRequest, applyData)

    }

    return(
        <div>
            <Header/>
            <div className="new_sales_rep">
                <h1>New Rep</h1>
                <NewRepForm
                    data={salesRep}
                    inputChange={inputChange}
                    submit={submit}
                />
            </div>
            
        </div>
    )
}
export default NewRepView;