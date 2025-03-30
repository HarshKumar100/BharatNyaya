import { setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";

const useGetUserProfile = (userId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (!userId) return;
                
                const res = await axios.get(`${USER_API_END_POINT}/profile/${userId}`, { 
                    withCredentials: true 
                });
                if (res.data.success) { 
                    dispatch(setUserProfile(res.data.user));
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to load user profile");
            }
        };
        fetchUserProfile();
    }, [userId, dispatch]);

    return null;
};

export default useGetUserProfile;