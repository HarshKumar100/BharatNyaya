import { setAllAppliedLawyers } from "@/redux/lawyerSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAppliedLawyers = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedLawyers = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true});
                console.log(res.data);
                if(res.data.success){
                    dispatch(setAllAppliedLawyers(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedLawyers();
    },[])
};
export default useGetAppliedLawyers;