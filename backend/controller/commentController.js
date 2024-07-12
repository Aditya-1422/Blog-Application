import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import bcrypt from 'bcrypt';

// Create Comment 
export const createComment = async (req, res, next) => {
    try {
        const newComment = new Comment(req.body);
        const savedComment = await newComment.save();
        return res.status(201).json({
            success: true,
            message: "Comment created successfully!",
            comment: savedComment
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        });
    }
};

//Get All Comments 
export const getAllComments = async (req,res,next) => {
    try {
        const comments = await Comment.find();
        return res.status(200).json({
            message:true,
            comment: comments
        })
    } catch (error) { 
        return res.status(500).json({
        success: false,
        message: "Internal Server Error!",
        error: error.message
    });
        
    }
}

// Get Comments from Post ID
export const getPostComments = async (req, res, next) => {
    try {
        const postComments = await Comment.find({ postId: req.params.postId });
        if (!postComments.length) {
            return res.status(404).json({
                success: false,
                message: "Comments not found!"
            });
        }
        return res.status(200).json({
            success: true,
            comments: postComments
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        });
    }
};

// Update Comment By Id
export const updateCommentById = async (req, res, next) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found!"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Comment updated successfully!",
            comment: updatedComment
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        });
    }
};

// Delete Comment By Id
export const deleteCommentById = async (req, res, next) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found!"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        });
    }
};
