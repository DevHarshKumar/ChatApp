import axiosInstance from "./axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (message) => toast(message);

export const deleteRequest = async ({ email, userId }) => {
    if (!email || !userId) {
        console.error("Missing fields");
        return;
    }

    try {
        console.log(email,userId)
        const response = await axiosInstance.delete('/deleteRequest', {params :{email,userId}});
        
        if (response.status === 200) {
            notify(response.data.message);
            window.location.reload();
        }
    } catch (error) {
        console.log("Error:", error);
        notify("Error deleting request");
    }
};

export const deleteFriend = async ({ email, userId }) => {
    if (!email || !userId) {
        console.error("Missing fields");
        return;
    }

    try {
        console.log(email,userId)
        const response = await axiosInstance.delete('/deleteFriend', {params :{email,userId}});
        
        if (response.status === 200) {
            notify(response.data.message);
            window.location.reload();
        }
    } catch (error) {
        console.log("Error:", error);
        notify("Error deleting friend");
    }
};

export const addFriend=async({email,userId})=>{
     if(!email || !userId){
        return;
     }
     console.log(email,userId)
     try {
        const response=await axiosInstance.get('/acceptRequest',{params:{email,userId}});
        if(response.status===200){
            notify("Added to list");
            window.location.reload();
        }
     } catch (error) {
        console.error("error",error);
        notify(error.response.message);
     }
}
