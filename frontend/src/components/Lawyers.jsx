import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Lawyer from './Lawyer';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const lawyersArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Lawyers = () => {
    const { allLawyers, searchedQuery } = useSelector(store => store.lawyer);
    const [filterLawyers, setFilterLawyers] = useState(allLawyers);

    useEffect(() => {
        if (searchedQuery) {
            const filteredLawyers = allLawyers.filter((lawyer) => {
                return lawyer.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                lawyer.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    lawyer.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterLawyers(filteredLawyers)
        } else {
            setFilterLawyers(allLawyers)
        }
    }, [allLawyers, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterLawyers.length <= 0 ? <span>Lawyers & Addvocates not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterLawyers.map((lawyer) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={lawyer?._id}>
                                                <Lawyer lawyer={lawyer} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Lawyers