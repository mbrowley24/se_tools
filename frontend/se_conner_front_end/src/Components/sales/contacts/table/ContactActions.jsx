import React from "react";
import SaveButton from "../../../form/SaveButton";
import ResetButton from "../../../form/ResetButton";
import DeleteButton from "../../../form/DeleteButton";
import useHttp from "../../../../hooks/useHttp";
import { useDispatch } from "react-redux";
import { companyActions } from "../../../../store/company";

function ContactActions({data, update, email_unique, reset, errors}){
    const {httpRequest} = useHttp();
    const dispatch = useDispatch();

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
                        <DeleteButton/>
                    </>
                    
            }
        </td>
    )
}

export default ContactActions;