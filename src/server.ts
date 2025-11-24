import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 4000;

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MONGO DB Connected !");

        app.listen(`Server is running on the port ${PORT}`);
    } catch(error) {
        console.error("Error connecting to server:", error);
    }
}

start();