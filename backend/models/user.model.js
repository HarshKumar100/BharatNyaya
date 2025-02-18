import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','lawyer'],
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, // URL to resume file
        resumeOriginalName:{type:String},
        court:{type:mongoose.Schema.Types.ObjectId, ref:'Court'}, 
        profilePhoto:{
            type:String,
            default:""
        },
        profilePicture: { type: String, default: '' },
    },
},{timestamps:true});
export const User = mongoose.model('User', userSchema);