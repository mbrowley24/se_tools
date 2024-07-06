import React, {useEffect, useMemo, useReducer, useState} from "react";
import MeetingDate from "../new/MeetingDate";
import MeetingTime from "../new/MeetingTime";
import MeetingIsVirtual from "../new/MeetingIsVirtual";
import MeetingAction from "./MeetingAction";
import MeetingTitle from "../new/MeetingTitle";
import useMeeting from "../../../../hooks/useMeeting";


function MeetingTableViewRow({data}){
    const [edit, setEdit] = useState(false);
    const {checkForErrors, meetingInit, meetingReducer} = useMeeting();
    const [meetingData, dispatchMeeting] = useReducer(meetingReducer, meetingInit);
    const error = useMemo(()=>checkForErrors(meetingData.newMeeting),[meetingData.newMeeting]);
    const toggleEdit = ()=> setEdit(!edit);

    console.log(error);
    useEffect(()=>{
        
        dispatchMeeting({type: 'init', payload: data});

    },[data, edit]);

    

    return(
        <tr>
            <td><MeetingTitle data={meetingData.newMeeting.title} edit={edit} error={error["title"]}/></td>
            <td><MeetingDate data={meetingData.newMeeting.meeting_date} edit={edit} error={error["date"]}/></td>
            <td><MeetingTime data={meetingData.newMeeting.meeting_time} edit={edit} error={error["time"]}/></td>
            <td><MeetingIsVirtual data={meetingData.newMeeting.is_virtual? "Yes" : "No"} edit={edit}/></td>
            <td>{meetingData.newMeeting.notes}</td>
            <td>
                <MeetingAction data={meetingData.newMeeting} 
                                dispatch={dispatchMeeting} 
                                error={error} 
                                canEdit={toggleEdit}
                                edit={edit}
                                id={meetingData.newMeeting.id}
                                />
            </td>
        </tr>
    )
}


export default MeetingTableViewRow;