import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, LAWYER_API_END_POINT } from '@/utils/constant';
import { setSingleLawyer } from '@/redux/lawyerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const LawyerDescription = () => {
    const {singleLawyer} = useSelector(store => store.lawyer);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleLawyer?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const lawyerId = params.id;
    const dispatch = useDispatch();

    const applyLawyerHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${lawyerId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleLawyer = {...singleLawyer, applications:[...singleLawyer.applications,{applicant:user?._id}]}
                dispatch(setSingleLawyer(updatedSingleLawyer)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleLawyer = async () => {
            try {
                const res = await axios.get(`${LAWYER_API_END_POINT}/get/${lawyerId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleLawyer(res.data.lawyer));
                    setIsApplied(res.data.lawyer.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleLawyer(); 
    },[lawyerId,dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleLawyer?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleLawyer?.postion} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleLawyer?.joType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleLawyer?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                onClick={isApplied ? null : applyLawyerHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Lawyer Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleLawyer?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleLawyer?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleLawyer?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleLawyer?.experience} yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleLawyer?.salary}LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleLawyer?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleLawyer?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default LawyerDescription