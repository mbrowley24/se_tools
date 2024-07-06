import React, {useMemo, useState} from "react";
import OpportunitySave from "./OpportunitySave";
import DeleteButton from "../../../form/DeleteButton";
import useHttp from "../../../../hooks/useHttp";
import Modal from "../../../form/Modal";
import OpportunityDelete from "./OpportunityDelete";
import SaveButton from "../../../form/SaveButton";

function OpportunityActions({opportunity, update, reset, errors, edit, toogleEdit}){
    const [showModal, setShowModal] = useState(false);

    const toogleModal = () => setShowModal((prev)=>!prev);

    return(
        <td>
            {
                edit?
                        <>
                            <button className="reset"
                                onClick={()=>reset()}
                            >Reset</button>
                            <OpportunitySave opportunity={opportunity} errors={errors}/>
                        </>
                        
                    :
                    <>
                        <Modal isOpen={showModal}
                            onClose={toogleModal}
                            children={<OpportunityDelete data={opportunity} onClose={toogleModal} />} 
                            />
                        <button className="edit"
                            onClick={()=>toogleEdit()}
                        >Edit</button>
                        <button className="delete" 
                            onChange={()=>toogleModal()}
                        >
                            Delete
                        </button>
                    </>
            }
        </td>
    )
}

export default OpportunityActions;