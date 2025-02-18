import { setAllAdminLawyers } from '@/redux/lawyerSlice'
import { LAWYER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminLawyers = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminLawyers = async () => {
            try {
                const res = await axios.get(`${LAWYER_API_END_POINT}/getadminlawyers`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAdminLawyers(res.data.lawyers));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminLawyers();
    },[])
}

export default useGetAllAdminLawyers