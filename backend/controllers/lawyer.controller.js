import { Lawyer } from "../models/lawyer.model.js";

// admin post krega lawyer
export const postLawyer = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, lawyerType, experience, position, courtId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !lawyerType || !experience || !position || !courtId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const lawyer = await Lawyer.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            lawyerType,
            experienceLevel: experience,
            position,
            court: courtId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New lawyer created successfully.",
            lawyer,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
export const getAllLawyers = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const lawyers = await Lawyer.find(query).populate({
            path: "court"
        }).sort({ createdAt: -1 });
        if (!lawyers) {
            return res.status(404).json({
                message: "Lawyers not found.",
                success: false
            })
        };
        return res.status(200).json({
            lawyers,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getLawyerById = async (req, res) => {
    try {
        const lawyerId = req.params.id;
        const lawyer = await Lawyer.findById(lawyerId).populate({
            path:"applications"
        });
        if (!lawyer) {
            return res.status(404).json({
                message: "Lawyers not found.",
                success: false
            })
        };
        return res.status(200).json({ lawyer, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne lawyer create kra hai abhi tk
export const getAdminLawyers = async (req, res) => {
    try {
        const adminId = req.id;
        const lawyers = await Lawyer.find({ created_by: adminId }).populate({
            path:'court',
            createdAt:-1
        });
        if (!lawyers) {
            return res.status(404).json({
                message: "Lawyers not found.",
                success: false
            })
        };
        return res.status(200).json({
            lawyers,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
