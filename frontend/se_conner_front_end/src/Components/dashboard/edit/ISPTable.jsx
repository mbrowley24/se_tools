import React, {useEffect, useReducer} from 'react';
import ISPTableHead from './ISPTableHead';
import ISPTableBody from './ISPTableBody';
import useHttp from '../../../hooks/useHttp';
import { ispActions } from '../../../store/ispStore';
import { useDispatch, useSelector } from 'react-redux';

function ISPTable() {
    const {httpRequest} = useHttp();
    const dispatch = useDispatch();
    const ispData = useSelector(state=>state.ispData);

    useEffect(() => {

        
    }), []

    useEffect(() => {

        const configRequest = {
            url: "api/v1/isp",
            method: "GET",
        }

        function applyData(res){
            
            if(res.status === 200){
                dispatch(ispActions.setIspData(res.data));
            }
        }

        (async () => {
            await httpRequest(configRequest, applyData);
        })()

    }, [])

    return (
        <table>
            <ISPTableHead />
            <ISPTableBody   
                isps={ispData.ispData}
                dispatch={dispatch}
                actions={ispActions}
            />
        </table>
    )
}

export default ISPTable;