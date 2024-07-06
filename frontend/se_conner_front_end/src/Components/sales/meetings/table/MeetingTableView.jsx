import React, {useEffect, useReducer} from "react";
import { useParams } from "react-router-dom";
import Header from "../../../header/Header";
import MeetingTableViewTable from "./MeetingTableViewTable";
import useHttp from "../../../../hooks/useHttp";
import useMeeting from "../../../../hooks/useMeeting";
import "../../../../css/table/table_form.css";
import MeetingOpporunity from "./MeetingOpportunity";

function MeetingTableView(){
    const {id} = useParams();
    const {httpRequest} = useHttp();
    const {meetingInit, meetingReducer} = useMeeting();
    const [meetingData, dispatchMeeting] = useReducer(meetingReducer, meetingInit);


    useEffect(()=>{

        const configRequest = {
            url: `api/v1/opportunities/${id}/meetings`,
            method: "GET",
        }

        function applyData(res){

            if(res.status === 200){
                dispatchMeeting({type: "set_data", payload: res.data});
            }
            
        }

        (async()=>{

            await httpRequest(configRequest, applyData);

        })();

    },[])

    return(
        <div>
            <Header/>
            <div className="container">
                <MeetingOpporunity data={meetingData.opportunity}/>
                <MeetingTableViewTable data={meetingData} dispatch={dispatchMeeting} id={id}/>
            </div>
        </div>
    )
}

export default MeetingTableView;