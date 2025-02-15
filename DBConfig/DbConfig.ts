import mongoose from "mongoose";

export async function DbConfig() {
    try {
        const connection = await mongoose.connect(`${process.env.MongoDB_URI}`)
        if (connection) {
            console.log("Database Connected")
        }
    } catch (error) {
        console.log("Error occurred Database Not Connected\n", error)
    }
}