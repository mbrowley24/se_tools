import {regex_map} from "../helper/general";




function useMeeting(){


    function checkForErrors(data){

        const error = {};

        if(data.title === "" || data.title.trim().length < 5){
            
            error.title = "required";

        }else if(!regex_map.meeting_title_regex.test(data.title)){
        
            error.title = "invalid characters";
        
        }else{

            delete error.title;
        }

        if(!regex_map.date_regex.test(data.meeting_date)){
            
            error.date = "required";
        
        }else{
            delete error.date;
        }

        

        if(!regex_map.time_regex.test(data.meeting_time) && !regex_map.time_regex_long.test(data.meeting_time)){
        
            error.time = "required";
        
        }else{
            delete error.time;
        }


        return error

    };

    const meetingInit={
        opportunity:{
            id: '',
            name: '',
            value: '',
        },
        meetings: [],
        newMeeting: {
            id: '',
            meeting_date: '',
            meeting_time: '',
            is_virtual: false,
            title: "",
        },
    }


    function meetingReducer(state, action){
        
        let data = JSON.parse(JSON.stringify(state));

        switch(action.type){
            
            case "set_data":

                data.opportunity = {...action.payload.opportunity};
                data.meetings = [...action.payload.meetings];
                
                return data;

            case "title":

                const title = action.payload;

                if(title === "" || (title.trim().length > 0 && title.trim().length <= 100)){
                    data.newMeeting.title = title;
                }
                
                return data;

            case "init":
                    
                    data.newMeeting = {...action.payload};
                    return data;

            case "date":
                
                data.newMeeting.meeting_date = action.payload;

                return data;

            case "time":

                data.newMeeting.meeting_time = action.payload;
                return data;
            
            case "isVirtual":

                data.newMeeting.is_virtual = action.payload;

                return data;

            case 'new_meeting':
                    
                    data.meetings.push(action.payload);
                    
                    data.newMeeting = {
                        id: '',
                        meeting_date: '',
                        meeting_time: '',
                        is_virtual: false,
                        title: "",
                    }

                    return data;

            case "reset":
                    
                data.newMeeting = {
                    id: '',
                    meeting_date: '',
                    meeting_time: '',
                    is_virtual: false,
                    title: "",
                }
    
                return data;
            
            case "update":
                
                const updatedMeeting = {...action.payload};
                
                const filteredMeetings = data.meetings.filter(meeting => meeting.id !== updatedMeeting.id);
                filteredMeetings.push(updatedMeeting);

                filteredMeetings.sort((a, b) => {
                    return new Date(a.meeting_date) - new Date(b.meeting_date) && a.meeting_time - b.meeting_time;
                })

                data.meetings = [...filteredMeetings];
                
                console.log(data);
                return data;

            default:
                return data;
        }
    }

    return({
        checkForErrors,
        meetingInit,
        meetingReducer
    })
}

export default useMeeting;