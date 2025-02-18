import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CourtsTable = () => {
    const { courts, searchCourtByText } = useSelector(store => store.court);
    const [filterCourt, setFilterCourt] = useState(courts);
    const navigate = useNavigate();
    useEffect(()=>{
        const filteredCourt = courts.length >= 0 && courts.filter((court)=>{
            if(!searchCourtByText){
                return true
            };
            return court?.name?.toLowerCase().includes(searchCourtByText.toLowerCase());

        });
        setFilterCourt(filteredCourt);
    },[courts,searchCourtByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered courts</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCourt?.map((court) => (
                            <tr>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={court.logo}/>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{court.name}</TableCell>
                                <TableCell>{court.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/courts/${court._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CourtsTable