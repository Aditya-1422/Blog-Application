import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide complete Information!!"
            });
        }

        const exUser = await User.findOne({ $or: [{ username }, { email }] });
        if (exUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists!!!"
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await User.create({ username, email, password: hashedPassword });
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user 
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide complete Information!!"
            });
        }

        const exUser = await User.findOne({ email });
        if (!exUser) {
            return res.status(404).json({
                success: false,
                message: "User not registered!!!"
            });
        }

        const isPasswordValid = bcrypt.compareSync(password, exUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials!!"
            });
        }

        const token = jwt.sign({ id: exUser._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        const { password: userPassword, ...userInfo } = exUser._doc;

        return res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
            sameSite: 'strict'
        }).status(200).json({
            success: true,
            message: "User logged in successfully!!",
            userInfo
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

export const logout = (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
            sameSite: 'strict'
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};
