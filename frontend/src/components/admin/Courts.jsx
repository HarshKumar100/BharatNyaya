import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CourtsTable from './CourtsTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCourts from '@/hooks/useGetAllCourts'; // ✅ Fixed import
import { useDispatch } from 'react-redux';
import { setSearchCourtByText } from '@/redux/courtSlice';

const Courts = () => {
    const courts = useGetAllCourts(); // Assign returned value to a variable
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCourtByText(input));
    }, [input]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/courts/create")}>
                        New Court
                    </Button>
                </div>
                <CourtsTable courts={courts} /> {/* Pass courts data */}
            </div>
        </div>
    );
};

export default Courts;
