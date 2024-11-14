import express from 'express';
const app=express();
app.use(express.json())
app.use('/UserData/userProfileImages', express.static('UserData/userProfileImages'));

import cors from 'cors'
app.use(cors({
  origin: 'http://localhost:3000', // Specify your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Include credentials if needed (cookies, etc.)
}));
app.options('*', cors());
import dotenv from 'dotenv'
import connectDatabase from './config/connectDb.js';
import morgan from 'morgan';
app.use(morgan('dev'));




//routes
import userRoutes from './routes/userRoutes.js'
import contactRoutes from './routes/contactRoute.js'
import friendsRoutes from './routes/friendsRoutes.js'

//user Routes
app.use('/',userRoutes);
app.use('/',contactRoutes);
app.use('/',friendsRoutes);

connectDatabase();
dotenv.config();


const Port=process.env.PORT
app.listen(Port,()=>{
    console.log(`Backend listening on ${Port}`)
})