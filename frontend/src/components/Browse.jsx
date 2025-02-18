import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Lawyer from './Lawyer';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/lawyerSlice';
import useGetAllLawyers from '@/hooks/useGetAllLawyers';

// const randomLawyers = [1, 2,45];

const Browse = () => {
    useGetAllLawyers();
    const {allLawyers} = useSelector(store=>store.lawyer);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allLawyers.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allLawyers.map((lawyer) => {
                            return (
                                <Lawyer key={lawyer._id} lawyer={lawyer}/>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse