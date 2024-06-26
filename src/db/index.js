import mongoose from "mongoose";
import env from "dotenv";
import {DB_NAME} from "../constants.js";
env.config();


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected" + connectionInstance.connection.host);
    } catch (error) {
        console.log("Error in connecting to MongoDB", error);
    }
};

export default connectDB;