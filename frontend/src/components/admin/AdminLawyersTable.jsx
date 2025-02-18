import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminLawyersTable = () => { 
    const {allAdminLawyers, searchLawyerByText} = useSelector(store=>store.lawyer);

    const [filterLawyers, setFilterLawyers] = useState(allAdminLawyers);
    const navigate = useNavigate();

    useEffect(()=>{ 
        console.log('called');
        const filteredLawyers = allAdminLawyers.filter((lawyer)=>{
            if(!searchLawyerByText){
                return true;
            };
            return lawyer?.title?.toLowerCase().includes(searchLawyerByText.toLowerCase()) || lawyer?.court?.name.toLowerCase().includes(searchLawyerByText.toLowerCase());

        });
        setFilterLawyers(filteredLawyers);
    },[allAdminLawyers,searchLawyerByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent  posted lawyers</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Court Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterLawyers?.map((lawyer) => (
                            <tr>
                                <TableCell>{lawyer?.court?.name}</TableCell>
                                <TableCell>{lawyer?.title}</TableCell>
                                <TableCell>{lawyer?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/courts/${lawyer._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/lawyers/${lawyer._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
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

export default AdminLawyersTable