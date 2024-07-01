import React, {useState} from "react";
import SaveButton from "../../../form/SaveButton";
import ResetButton from "../../../form/ResetButton";
import DeleteButton from "../../../form/DeleteButton";
import useHttp from "../../../../hooks/useHttp";
import { useDispatch } from "react-redux";
import { companyActions } from "../../../../store/company";
import Modal from "../../../form/Modal";
import ContactDelete from "./ContactDelete";

function ContactActions({data, update, email_unique, reset, errors, id}){
    const [showModal, setShowModal] = useState(false);
    const {httpRequest} = useHttp();
    const dispatch = useDispatch();

    const toogleModal = () => setShowModal((prev) => !prev);

    function submit(e){
        e.preventDefault();
        
        const configRequest = {
            url: `api/v1/contacts/update/${data.id}`,
            method: 'POST',
            data: data,
        };
        
        function applyData(res){
            if(res.status === 200){
                dispatch(companyActions.updateContacts(res.data));
                reset();
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData)
        })();
    }

    return(

        <td>
            {
                update && email_unique?
                <>
                    <SaveButton save={submit} disable={Object.keys(errors).length > 0}/>
                    <ResetButton reset={reset}/>
                </>
                :
                    <>
                        <Modal isOpen={showModal} 
                            onClose={toogleModal}
                            children={<ContactDelete data={data} onClose={toogleModal} id={id} />}/>
                        <DeleteButton deleteAction={toogleModal}/>
                    </>
                    
            }
        </td>
    )
}

export default ContactActions;