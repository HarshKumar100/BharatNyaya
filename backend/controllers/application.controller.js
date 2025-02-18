import { Application } from "../models/application.model.js";
import { Lawyer } from "../models/lawyer.model.js";

export const applyLawyer = async (req, res) => {
    try {
        const userId = req.id;
        const lawyerId = req.params.id;
        if (!lawyerId) {
            return res.status(400).json({
                message: "lawyer id is required.",
                success: false
            })
        };
        // check if the user has already applied for the lawyer
        const existingApplication = await Application.findOne({ lawyer: lawyerId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this lawyers",
                success: false
            });
        }

        // check if the lawyers exists
        const lawyer = await Lawyer.findById(lawyerId);
        if (!lawyer) {
            return res.status(404).json({
                message: "Lawyer not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            lawyer:lawyerId,
            applicant:userId,
        });

        lawyer.applications.push(newApplication._id);
        await lawyer.save();
        return res.status(201).json({
            message:"Lawyer applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedLawyers = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'lawyer',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'court',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req,res) => {
    try {
        const lawyerId = req.params.id;
        const lawyer = await Lawyer.findById(lawyerId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!lawyer){
            return res.status(404).json({
                message:'Lawyer not found.',
                success:false
            })
        };
        return res.status(200).json({
            lawyer, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}