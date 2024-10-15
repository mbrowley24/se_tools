import { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const useHttp = () =>{
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const httpRequest = useCallback(async(requestConfig, applyData)=>{
        // console.log(requestConfig)
        try{
            setIsLoading(true);
            const httpResponse = await  axios({
                method: requestConfig.method? requestConfig.method : 'GET',
                baseURL: "http://localhost:8080/api/v1/",
                url: requestConfig.url,
                data: requestConfig.data,
                responseType: requestConfig.responseType? requestConfig.responseType : 'json',
                withCredentials: true,
                headers:{
                    "Content-Type": 'application/json'
                    
                },
                signal : requestConfig.signal
            })
            
            // console.log(httpResponse)
            if(httpResponse.status === 200){
                applyData(httpResponse);
                setIsLoading(false)
            }
            
        }catch(error){
            //console.log(error)
            if(error && error.response){

                if(error.response.status === 403){

                    navigate('/login')
                }else{

                    applyData(error);
                }

            }
        }
    }, [ navigate])


    return(
        {
            httpRequest,
            isLoading,
            setIsLoading,
        }
    )

}

export default useHttp;