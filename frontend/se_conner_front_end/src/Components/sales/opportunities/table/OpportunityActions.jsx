import React, {useState} from "react";
import OpportunitySave from "./OpportunitySave";
import DeleteButton from "../../../form/DeleteButton";
import useHttp from "../../../../hooks/useHttp";
import Modal from "../../../form/Modal";
import OpportunityDelete from "./OpportunityDelete";

function OpportunityActions({opportunity, update, reset, errors}){
    const [showModal, setShowModal] = useState(false);

    const toogleModal = () => setShowModal((prev)=>!prev);

    return(
        <td>
            {
                update?
                        <>
                            <OpportunitySave opportunity={opportunity} errors={errors}/>
                            <button className="reset"
                                onClick={()=>reset()}
                            >Reset</button>
                        </>
                        
                    :
                    <>
                        <Modal isOpen={showModal}
                            onClose={toogleModal}
                            children={<OpportunityDelete data={opportunity} onClose={toogleModal} />} 
                            />
                        <DeleteButton deleteAction={toogleModal}/>
                    </>
            }
        </td>
    )
}

export default OpportunityActions;