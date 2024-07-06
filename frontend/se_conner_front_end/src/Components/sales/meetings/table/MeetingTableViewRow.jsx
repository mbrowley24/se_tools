import React, {useEffect, useMemo, useReducer, useState} from "react";
import MeetingDate from "../new/MeetingDate";
import MeetingTime from "../new/MeetingTime";
import MeetingIsVirtual from "../new/MeetingIsVirtual";
import MeetingAction from "./MeetingAction";
import MeetingTitle from "../new/MeetingTitle";
import useMeeting from "../../../../hooks/useMeeting";


function MeetingTableViewRow({data, dispatch}){
    const [edit, setEdit] = useState(false);
    const {checkForErrors, meetingInit, meetingReducer} = useMeeting();
    const [meetingData, dispatchMeeting] = useReducer(meetingReducer, meetingInit);
    const error = useMemo(()=>checkForErrors(meetingData.newMeeting),[meetingData.newMeeting]);
    
    const toggleEdit = ()=> setEdit(!edit);

    useEffect(()=>{
        
        dispatchMeeting({type: 'init', payload: data});

    },[data, edit]);


    function inputChange(e){
        const {name, value, checked} = e.target;
        
        if(name === 'isVirtual'){
            console.log(name);
            console.log(checked);
            console.log(value);
            dispatchMeeting({type: name, payload: checked})
        
        }else{
            dispatchMeeting({type: name, payload: value})
        
        }
    }
    

    return(
        <tr>
            <td><MeetingTitle data={meetingData.newMeeting.title}
                                edit={edit}
                                name={"title"}
                                error={error["title"]}
                                inputChange={inputChange}
                                /></td>
            <td><MeetingDate data={meetingData.newMeeting.meeting_date} 
                            edit={edit}
                            name={'date'} 
                            error={error["date"]}
                            inputChange={inputChange}
                            /></td>
            <td><MeetingTime data={meetingData.newMeeting.meeting_time} 
                            edit={edit}
                            name={'time'} 
                            error={error["time"]}
                            inputChange={inputChange}
                            /></td>
            <td><MeetingIsVirtual data={meetingData.newMeeting.is_virtual} 
                                    edit={edit}
                                    name={'isVirtual'}
                                    inputChange={inputChange}
                                    /></td>
            <td>{meetingData.newMeeting.notes}</td>
            <td>
                <MeetingAction data={meetingData.newMeeting} 
                                dispatch={dispatch} 
                                error={error} 
                                canEdit={toggleEdit}
                                edit={edit}
                                />
            </td>
        </tr>
    )
}


export default MeetingTableViewRow;