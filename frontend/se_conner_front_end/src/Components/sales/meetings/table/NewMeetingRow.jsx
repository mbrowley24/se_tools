import React, {useMemo} from "react";
import MeetingTitle from "../new/MeetingTitle";
import MeetingDate from "../new/MeetingDate";
import MeetingTime from "../new/MeetingTime";
import MeetingIsVirtual from "../new/MeetingIsVirtual";
import useMeeting from "../../../../hooks/useMeeting";
import NewMeetingAction from "./NewMeetingAction";

function NewMeetingRow({data, dispatch, id}){
    const {checkForErrors} = useMeeting();
    const error = useMemo(()=>checkForErrors(data),[data]);

    function inputChange(e){
        const {name, value, checked} = e.target;

        if(name === 'isVirtual'){

            dispatch({type: name, payload: checked})
        
        }else{
            
            dispatch({type: name, payload: value})
        
        }
        
    };

    return(
        <tr>
            <td>
                <MeetingTitle data={data.title} 
                                edit={true} 
                                error={error['title']} 
                                inputChange={inputChange} 
                                name={'title'}
                                />
            </td>
            <td>
                <MeetingDate data={data.meeting_date} 
                            edit={true} 
                            error={error['date']} 
                            inputChange={inputChange} 
                            name={'date'}
                            />
            </td>
            <td>
                <MeetingTime data={data.meeting_time} 
                            edit={true} 
                            error={error['time']} 
                            inputChange={inputChange} 
                            name={'time'}
                            />
            </td>
            <td>
                <MeetingIsVirtual data={data.is_virtual} 
                                edit={true}  
                                inputChange={inputChange} 
                                name={'isVirtual'}
                                />
            </td>
            <td>
                <NewMeetingAction data={data} dispatch={dispatch} error={error} id={id}/>
            </td>
            <td></td>
        </tr>
    )
}

export default NewMeetingRow;