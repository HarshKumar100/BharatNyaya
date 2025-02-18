import { setSingleCourt } from '@/redux/courtSlice'
import { setAllLawyers } from '@/redux/lawyerSlice'
import { COURT_API_END_POINT, LAWYER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCourtById = (courtId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleCourt = async () => {
            try {
                const res = await axios.get(`${COURT_API_END_POINT}/get/${courtId}`,{withCredentials:true});
                console.log(res.data.court);
                if(res.data.success){
                    dispatch(setSingleCourt(res.data.court));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCourt();
    },[courtId, dispatch])
}

export default useGetCourtById