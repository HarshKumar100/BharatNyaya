import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COURT_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCourt } from '@/redux/courtSlice'

const CourtCreate = () => {
    const navigate = useNavigate();
    const [courtName, setCourtName] = useState();
    const dispatch = useDispatch();
    const registerNewCourt = async () => {
        try {
            const res = await axios.post(`${COURT_API_END_POINT}/register`, {courtName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCourt(res.data.court));
                toast.success(res.data.message);
                const courtId = res?.data?.court?._id;
                navigate(`/admin/courts/${courtId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Court Name</h1>
                    <p className='text-gray-500'>What would you like to give your court name? you can change this later.</p>
                </div>

                <Label>Court Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="LawyerHunt"
                    onChange={(e) => setCourtName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/courts")}>Cancel</Button>
                    <Button onClick={registerNewCourt}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CourtCreate