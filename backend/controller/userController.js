import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import bcrypt from 'bcrypt'

//Get All User
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

//Get User By Id
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }
        const {password,...info} = user._doc
        return res.status(200).json({
            success: true,
            user: info
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        });
    }
};


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


// Delete User By Id
export const deleteById = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        await Post.deleteMany({ userId: req.params.id });
        await Comment.deleteMany({ userId: req.params.id });

        return res.status(200).json({
            success: true,
            message: "User and associated posts and comments deleted successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        });
    }
};