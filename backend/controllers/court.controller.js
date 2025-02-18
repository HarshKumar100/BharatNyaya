import { Court } from "../models/court.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCourt = async (req, res) => {
    try {
        const { courtName } = req.body;
        if (!courtName) {
            return res.status(400).json({
                message: "Court name is required.",
                success: false
            });
        }
        let court = await Court.findOne({ name: courtName });
        if (court) {
            return res.status(400).json({
                message: "You can't register same court.",
                success: false
            })
        };
        court = await Court.create({
            name: courtName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Court registered successfully.",
            court,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getCourt = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const courts = await Court.find({ userId });
        if (!courts) {
            return res.status(404).json({
                message: "Courts not found.",
                success: false
            })
        }
        return res.status(200).json({
            courts,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get court by id
export const getCourtById = async (req, res) => {
    try {
        const courtId = req.params.id;
        const court = await Court.findById(courtId);
        if (!court) {
            return res.status(404).json({
                message: "Court not found.",
                success: false
            })
        }
        return res.status(200).json({
            court,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateCourt = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
 
        const file = req.file;
        // idhar cloudinary ayega
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, location, logo };

        const court = await Court.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!court) {
            return res.status(404).json({
                message: "Court not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Court information updated.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}