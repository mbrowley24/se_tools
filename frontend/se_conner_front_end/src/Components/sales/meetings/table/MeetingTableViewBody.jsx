import React, {useMemo} from "react";
import MeetingTableViewRow from "./MeetingTableViewRow";
import NewMeetingRow from "./NewMeetingRow";




function MeetingTableViewBody({data, dispatch, id}){
    const meetingCount = useMemo(()=>data.meetings.length, [data.meetings]);

    return(
        <tbody>
            {
                data.meetings.map((meeting, index) => {

                    return(
                        <MeetingTableViewRow key={index} data={meeting} dispatch={dispatch}/>
                    )
                })
            }
            {data && data.meetings.length === 0 && <tr><td colSpan="6">No meetings found</td></tr>}
            { meetingCount < 50 && <NewMeetingRow data={data.newMeeting} dispatch={dispatch} id={id}/>}
        </tbody>
    )
}

export default MeetingTableViewBody;