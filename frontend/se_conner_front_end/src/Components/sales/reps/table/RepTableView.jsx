import React, {useReducer, useState} from "react";
import Header from "../../../header/Header";
import Table from "./Table";
import Modal from "../../../form/Modal";
import DeleteSalesRep from "./DeleteSalesRep";
import useSalesRep from "../../../../hooks/useSalesRep";
import MyQuota from "../../mystats/MyQuota";
import "../../../../css/salesrep/salesreptable.css";


function RepTableView() {
    const {deleteInitialState, deleteSalesRepReducer, FIELDS} = useSalesRep();
    const [deleteRep, dispatchDeleteRep] = useReducer(deleteSalesRepReducer, deleteInitialState);
    

    const closeModal = () => {
        dispatchDeleteRep({type: FIELDS.CLOSE});
    }

    const openModal = (rep) => {
        dispatchDeleteRep({type: FIELDS.UPDATE, payload: rep });
    }

    const reset = () => dispatchDeleteRep({type: FIELDS.RESET});

    return (
        <div>
            <Header/>
            <div className="sales_rep_container">
                <h1>Sales Reps</h1>
                <MyQuota/>
                <Modal onClose={closeModal}
                        isOpen={deleteRep.isOpen}
                        children={<DeleteSalesRep reset={reset} onClose={closeModal} rep={deleteRep}/>}
                        />
                <Table deleteRep={openModal} setReset={reset} reset={deleteRep.updated}/>
            </div>
        </div>
    );
}

export default RepTableView;