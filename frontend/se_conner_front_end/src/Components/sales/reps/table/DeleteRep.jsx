import React, {useState} from "react";
import Modal from "../../../form/Modal";
import DeletePage from "./DeletePage";
import DeleteSalesRep from "./DeleteSalesRep";



function DeleteRep({data}){
    const [open, setOpen] = useState(false);

    const toogleModal = () => setOpen(!open); 

    
    return(
        <>
            <button className="delete" onClick={()=>toogleModal()}>
                <span className="material-symbols-outlined">
                    delete
                </span>
            </button>
            <Modal isOpen={open} onClose={toogleModal} children={<DeleteSalesRep data={data} onClose={toogleModal}/>}/>
        </>
    )
}

export default DeleteRep;