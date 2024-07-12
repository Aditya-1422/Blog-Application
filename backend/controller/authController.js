import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req,res,next) => {
    const {username,email,password} = req.body;

    try {
        if(!username || !email || !password){
            return res.status(404).json({
                success:false,
                message:"Please provide complete Information!!"
            })
        }
        const exUser = await User.findOne({$or:[{username},{email}]})
        if(exUser){
            return res.status(404).json({
                success:false,
                message:"User is already existed!!!"
            })
        }

        const hasedPassword = bcrypt.hashSync(password,10);

        const user = await User.create({ username, email, password:hasedPassword });
        return res.status(200).json({
            success: true,
            message: "User is created successfully",
            user 
        });
    } catch (error) {
        return res.status(500).json({success: false,message: "Something went wrong",error: error.message});
    }
}


export const login = async (req,res,next) => {
    const {email,password} = req.body;

    try {
        if(!email || !password){
        return res.status(404).json({
            success:false,
            message:"Please provide complete Information!!"
            })
        }
        const exUser = await User.findOne({email})
        if(!exUser){
            return res.status(404).json({
                success:false,
                message:"User is not registered!!!"
            })
        }
        const isPasswordValid = bcrypt.compareSync(password, exUser.password);

        if(!isPasswordValid){
            return res.status(404).json({
                success:false,
                message:"Invalid credentials!!"
            })
        }

        const token = jwt.sign({ id: exUser._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        const { password: userPassword, ...userInfo } = exUser._doc;

        return res.cookie("jwtToken",token).status(200).json({
            success:true,
            message:"User loggined successfully!!",
            userInfo
        })
        
    } catch (error) {
        return res.status(500).json({success: false,message: "Something went wrong",error: error.message});
    }
}

export const logout = (req, res, next) => {
    try {
        res.clearCookie("jwtToken", { httpOnly: true, secure: process.env.JWT_SECRET });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully."
        });
    } catch (error) {
        return res.status(500).json({success: false,message: "Something went wrong",error: error.message});
    }
};
