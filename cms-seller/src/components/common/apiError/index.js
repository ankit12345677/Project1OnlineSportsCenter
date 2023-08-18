import { NotificationManager } from "react-notifications";

const apiError = (error)=>{
    if(error && error.response && error.response.status && error.response.status === 440){
        for(let i=0; i<error.response.data.errors.length; i++){
            NotificationManager.error(error.response.data.errors[i])
        }
    }else if(error && error.response && error.response.data && error.response.data.errors){
        for(let i=0; i<error.response.data.errors.length; i++){
            NotificationManager.error(error.response.data.errors[i])
        }
    }else if(error.response && error.response.data && error.response.data.isJoi){
        for(let i=0; i<error.response.data.details.length; i++){
            NotificationManager.error(error.response.data.details[i].message)
        }
    }else{
        if(navigator.onLine){
            NotificationManager.error("something went wrong");
        }else{
            NotificationManager.error("we are offline, Please check your Internet connection");
        }
    }
}
export default apiError