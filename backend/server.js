import express from 'express';
const app=express();
app.use(express.json())
app.use('/UserData/userProfileImages', express.static('UserData/userProfileImages'));

import cors from 'cors'
app.use(cors());
app.options('*', cors());
import dotenv from 'dotenv'
import connectDatabase from './config/connectDb.js';
import morgan from 'morgan';
app.use(morgan('dev'));




//routes
import userRoutes from './routes/userRoutes.js'
import contactRoutes from './routes/contactRoute.js'
import friendsRoutes from './routes/friendsRoutes.js'
import messageRoutes from './routes/messageRoutes.js'

//user Routes
app.use('/',userRoutes);
app.use('/',contactRoutes);
app.use('/',friendsRoutes);
app.use('/',messageRoutes);

connectDatabase();
dotenv.config();


const Port=process.env.PORT
app.listen(Port,()=>{
    console.log(`Backend listening on ${Port}`)
})