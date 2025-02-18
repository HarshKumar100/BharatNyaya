import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedLawyerTable = () => {
    const {allAppliedLawyers} = useSelector(store=>store.lawyer);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied lawyers</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Lawyer Role</TableHead>
                        <TableHead>Court</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedLawyers.length <= 0 ? <span>You haven't applied any lawyer yet.</span> : allAppliedLawyers.map((appliedLawyer) => (
                            <TableRow key={appliedLawyer._id}>
                                <TableCell>{appliedLawyer?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedLawyer.lawyer?.title}</TableCell>
                                <TableCell>{appliedLawyer.lawyer?.court?.name}</TableCell>
                                <TableCell className="text-right"><Badge className={`${appliedLawyer?.status === "rejected" ? 'bg-red-400' : appliedLawyer.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedLawyer.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedLawyerTable