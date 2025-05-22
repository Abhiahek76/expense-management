//const database = "mongodb://127.0.0.1:27017/Ecomm";
import mongoose from "mongoose";
import dotenv from "dotenv";
//const MONGO_URi = process.env.MONGO_URI;
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Error: MONGO_URI is undefined. Check your .env file.");
  process.exit(1); // Stop the process if MONGO_URI is missing
}
const connectiondb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectiondb;
