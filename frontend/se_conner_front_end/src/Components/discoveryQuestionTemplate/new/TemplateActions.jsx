import React, {useState} from "react";
import Modal from "../../form/Modal";
import DeleteComponent from "../../form/DeleteComponent";
import useHttp from "../../../hooks/useHttp";

function TemplateActions({row, reset}){
    const [showModal, setShowModal] = useState(false);
    const {httpRequest} = useHttp();
    
    const onClose = () => setShowModal((prev) => !prev); 

    function resTemplate(){
        reset();
        onClose();
    }

    function deleteAction(e){
        e.preventDefault();

        const configRequest = {
            method: "DELETE",
            url: `api/v1/discovery-question-templates/${row.id}`,
            headers: {
                "Content-Type": "application/json",
            }
        };
        
        function applyData(res){
            
            if(res.status === 200){
                resTemplate();
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })()

    }
    

    return(
        <td>
            <div className="template_actions">
                <div>
                    <Modal isOpen={showModal}
                        onClose={onClose} 
                        children={<DeleteComponent data={row.name} onClose={onClose} deleteAction={deleteAction}/>}/>
                    <button className="no_btn" onClick={onClose}>
                        Delete
                    </button>
                    
                </div>
                <div>
                    <button className="no_btn"
                            onClick={() => downloadTemplate(row.id)}
                        >
                        Download
                    </button>
                </div>
            </div>
        </td>
    )
}

export default TemplateActions;