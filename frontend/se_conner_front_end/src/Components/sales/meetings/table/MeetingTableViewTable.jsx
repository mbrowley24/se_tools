import React from "react";
import MeetingTableViewHeader from "./MeetingTableViewHeader";
import MeetingTableViewBody from "./MeetingTableViewBody";



function MeetingTableViewTable({data, dispatch, id}){

    return(
        <table>
            <MeetingTableViewHeader/>
            <MeetingTableViewBody data={data} dispatch={dispatch} id={id}/>
        </table>
    )
}

export default MeetingTableViewTable;