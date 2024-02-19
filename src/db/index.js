require('dotenv').config()
import mongoose from "mongoose";
import { DB_NAME } from "../constants";
// ()() these are ifis immediately excute the functions
// we are trying to connect to the database
const connectDatabase = (async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`connect to mongodb ${connectionInstance}`)
        console.log(process.env.PORT);
    } catch (error) {
        console.log(`Error in connection from the database ${error}`);
        process.exit(1);
    }
})()

export default connectDatabase;