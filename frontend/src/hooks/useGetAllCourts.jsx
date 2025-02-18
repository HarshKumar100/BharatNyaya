import { setCourts} from '@/redux/courtSlice'
import { COURT_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCourts = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCourts = async () => {
            try {
                const res = await axios.get(`${COURT_API_END_POINT}/get`,{withCredentials:true});
                console.log('called');
                if(res.data.success){
                    dispatch(setCourts(res.data.courts));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCourts();
    },[])
}

export default useGetAllCourts;