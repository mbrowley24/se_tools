import React, {useState} from "react";
import SaveButton from "../../form/SaveButton";
import ResetButton from "../../form/ResetButton";
import DeleteButton from "../../form/DeleteButton";
import useHttp from "../../../hooks/useHttp";
import {useDispatch} from "react-redux";
import { companyActions } from "../../../store/company";
import CompanyDelete from "./CompanyDelete";
import Modal from "../../form/Modal";

function CompanyTableAction({canEdit, data, edit, reset, valid}){
    const [showModal, setShowModal] = useState(false);
    const {httpRequest} = useHttp();
    const dispatch = useDispatch();

    const toogleModal = () => setShowModal((prev) => !prev);
    



    function saveCompany(e){
        e.preventDefault();
        
        const configRequest = {
            url: `api/v1/companies/${data.id}`,
            method: 'PUT',
            data: data,
        }

        function applyData(res){
        
            if(res.status === 200){
                console.log(res.data)
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })();
    }

    return(
        <td>
            {
                edit ? 
                    <>
                        <button className="reset" 
                                onClick={()=>canEdit()}
                                >Reset</button>
                        <button className="save" onClick={(e)=>saveCompany()}>Save</button>
                    </>

                :
                <>
                    <Modal isOpen={showModal} 
                            onClose={toogleModal} 
                            children={<CompanyDelete data={data} onClose={toogleModal}/>}/>
                    <button className="edit" onClick={()=>canEdit()}>Edit</button>
                    <button className="delete" onClick={toogleModal}>Delete</button>
                    {/* <DeleteButton deleteAction={toogleModal}/> */}
                </>
                    
            }
            
        </td>
    )
}

export default CompanyTableAction;