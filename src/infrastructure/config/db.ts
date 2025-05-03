import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const url = process.env.MONGODB_URI as string;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
