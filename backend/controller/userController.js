import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import bcrypt from 'bcrypt'


export const getAllUser = async (req,res,next) => {
    try {
        const users = await User.find();
        return res.status(201).json({
            users
        })
    } catch (error) {
        return res.status(404).json({success:false, message:"Internal Server Error!", error: error.message})
    }
}

//Update By Id

export const updateById = async (req,res,next) => {
    try {
        if(req.body.password){
            req.body.password = await bcrypt.hashSync(req.body.password,10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        return res.status(200).json({
            success:true,
            message:"User updated successfully!!",
            updatedUser
        })

    } catch (error) {
        return res.status(404).json({success:false, message:"Internal Server Error!", error: error.message})
    }
}


//Delete By Id

export const deleteById = async (req,res,next) => {
    try {
        const User = await User.findByIdAndDelete(req.params.id)
        const Post = await Post.findByIdAndDelete({userId:req.params.id})
        const Comment = await Comment.findByIdAndDelete({userId:req.params.id})
    } catch (error) {
        return res.status(404).json({success:false, message:"Internal Server Error!", error: error.message})
    }
}