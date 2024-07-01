import React, {useMemo} from "react";
import DeleteComponent from "../../../form/DeleteComponent";
import useTextTransform from "../../../../hooks/useTextTransform";
import { useDispatch } from "react-redux";
import { companyActions } from "../../../../store/company";
import useHttp from "../../../../hooks/useHttp";


function ContactDelete({data, onClose, id}){
    const {httpRequest} = useHttp();
    const dispatch = useDispatch();
    const {capitalizeName} = useTextTransform();
    const contactName = useMemo(() => `${data.last_name}, ${data.first_name} (${data.email})`, [data])


    function deleteAction(e){
        e.preventDefault();
        console.log(id);

        if(!id) return;
        const configRequest={
            url: `api/v1/contacts/${data.id}/delete/${id}`,
            method: 'DELETE',
        }

        function applyData(res){
            console.log(res);
            if(res.status === 200){
                dispatch(companyActions.updateContacts(res.data));
                onClose();
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData)
        })();
    }

    return(
        <DeleteComponent data={`${capitalizeName(contactName)}`}
                        onClose={onClose} 
                        deleteAction={deleteAction}
                        />
    )
}

export default ContactDelete;