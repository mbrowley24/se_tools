import React, {useReducer, useState} from "react";
import Header from "../../../header/Header";
import Table from "./Table";
import Modal from "../../../form/Modal";
import DeleteSalesRep from "./DeleteSalesRep";
import { useSelector } from "react-redux";
import { salesRepActions } from "../../../../store/salesRep";
import MyQuota from "../../mystats/MyQuota";
import "../../../../css/table/table_form.css";


function RepTableView() {
    
    const deleteRep = useSelector(state => state.salesRepData.deleteRep);
    const [openModal, setOpenModel] = useState(false);
    
    function toggleModal(){
        setOpenModel(!openModal)
    };


    return (
        <div>
            <Header/>
            <div className="container">
                <h1>Sales Reps</h1>
                <MyQuota/>
                <Modal onClose={toggleModal}
                        isOpen={openModal}
                        children={<DeleteSalesRep onClose={toggleModal} rep={deleteRep}/>}
                        />
                <Table deleteRep={openModal}/>
            </div>
        </div>
    );
}

export default RepTableView;