import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import bcrypt from 'bcrypt'


//Create Post 
export const createPost = async (req,res,next) => {
    try {
        const newPost = await Post.create(req.body)
        const savedPost = await newPost.save()
        return res.status(201).json({
            success:true,
            message:"Post created successfully!!!"
        })
    } catch (error) {
        return res.status(404).json({success:false, message:"Internal Server Error!", error: error.message})
    }
}


//Get All Posts
export const getAllPost = async (req,res,next) => {
    try {
        const posts = await Post.find();
        return res.status(201).json({
            posts
        })
    } catch (error) {
        return res.status(404).json({success:false, message:"Internal Server Error!", error: error.message})
    }
}

//Get Post By Id
export const getPostById = async (req, res, next) => {
    try {
        const user = await Post.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Posts not found!"
            });
        }
        const {password,...info} = user._doc
        return res.status(200).json({
            success: true,
            user: info
        });
    } catch (error) {        
        return res.status(404).json({success:false, message:"Internal Server Error!", error: error.message})
    }
};


//Get Post from User id
export const getPostByUserId = async (req,res,next) => {
    try {
        const userPosts = await Post.find({userId:req.params.userId})
        if(!userPosts){
            return res.status(404).json({
                success: false,
                message: "Post not found!"
            });
        }
        return res.status(200).json({
            success: true,
            user: userPosts
        });
    } catch (error) {
        return res.status(404).json({success:false, message:"Internal Server Error!", error: error.message})
    }
}



//Update Post By Id

export const updatePostById = async (req,res,next) => {
    try {
        const updatedUser = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        return res.status(200).json({
            success:true,
            message:"Post updated successfully!!",
            updatedUser
        })

    } catch (error) {
        return res.status(404).json({success:false, message:"Internal Server Error!", error: error.message})
    }
}


// Delete Post By Id
export const deletePostById = async (req, res, next) => {
    try {
        const user = await Comment.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Comment not found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        });
    }
};