import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './router/authRouter.js';
import userRouter from './router/userRouter.js';
import postRouter from './router/postRouter.js';
import commentRouter from './router/commentRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config({ path: 'backend/config.env' });
const app = express();

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to Database!");
    }).catch((err) => {
        console.log(err);
    });
};

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"http://localhost:3000"},{credentials:true}))

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/comment', commentRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        success: false,
        message: "Internal Server Error!",
        error: err.message
    });
});

app.listen(process.env.PORT, () => {
    connectDb();
    console.log(`Server is working on: ${process.env.PORT}`);
});

export default app;
