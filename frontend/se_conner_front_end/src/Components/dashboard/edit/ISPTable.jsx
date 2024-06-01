import React, {useEffect, useReducer} from 'react';
import ISPTableHead from './ISPTableHead';
import ISPTableBody from './ISPTableBody';
import useISP from '../../../hooks/useISP';
import useHttp from '../../../hooks/useHttp';


function ISPTable() {
    const {httpRequest} = useHttp();
    const {initialState, ispReducer, FIELDS} = useISP();
    const [ispData, dispatchIspData] = useReducer(ispReducer, initialState);


    const reset = () => dispatchIspData({type: FIELDS.UPDATE});

    useEffect(() => {

        const configRequest = {
            url: "api/v1/isp",
            method: "GET",
        }

        function applyData(res){
            
            if(res.status === 200){
                dispatchIspData({type: FIELDS.ISPS, payload: res.data.data});
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
                isps={ispData.isps}
                dispatch={dispatchIspData}
                data={ispData.isp}
            />
        </table>
    )
}

export default ISPTable;