import mongoose from 'mongoose';
const MONGO_CONNECTION="mongodb://localhost:27017";
const connectDatabase=async()=>{
    try {
        const DB_OPTIONS={
           dbName:"Auth"
        }

        await mongoose.connect(MONGO_CONNECTION,DB_OPTIONS);
        console.log("Database Connected");
    } catch (error) {
        console.log("error:",error);
    }
}

export default connectDatabase;