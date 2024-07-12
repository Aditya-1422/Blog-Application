import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

import authRouter from './router/authRouter.js'
import userRouter from './router/userRouter.js'


dotenv.config({path:'backend/config.env'})
const app = express();

const connectDb = () =>{
        mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("Connect to Database!!!")
        }).catch((err)=>{
            console.log(err)
        })
    
}

app.listen(process.env.PORT, ()=> {
    connectDb();
    console.log(`Server is working on : ${process.env.PORT}`)
})

app.use(express.json())


app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRouter);