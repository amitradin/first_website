import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connect to mongodb")
    } catch (error) {
        console.log("Error connecting to mongodb" , error)
        process.exit(1) // exited with faliure
        

    }
}
