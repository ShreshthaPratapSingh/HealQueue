import mongoose from "mongoose";

export const connectDB = async () => {
    if(!process.env.MONGO_DB_URL){
        throw new Error("No mongo db url available!!")
    }
    else{
        await mongoose.connect(process.env.MONGO_DB_URL as string)
        console.log("DB connected successfully!!")
    }
}