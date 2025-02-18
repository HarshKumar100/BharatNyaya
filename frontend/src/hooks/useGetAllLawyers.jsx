import { setAllLawyers } from '@/redux/lawyerSlice'
import { LAWYER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllLawyers = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.lawyer);
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchAllLawyers = async () => {
            try {
                if (!user) return; // Only make request if user is authenticated
                
                const res = await axios.get(`${LAWYER_API_END_POINT}/get?keyword=${searchedQuery}`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${user.token}` // Add auth token if you're using one
                    }
                });
                
                if (res.data.success) {
                    dispatch(setAllLawyers(res.data.lawyers));
                }
            } catch (error) {
                console.log(error);
                if (error.response?.status === 401) {
                    // Handle unauthorized error - maybe redirect to login
                    console.log("User not authenticated");
                }
            }
        }
        fetchAllLawyers();
    }, [searchedQuery, user])
}

export default useGetAllLawyers