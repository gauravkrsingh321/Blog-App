import mongoose from "mongoose";

export const dbConnect = async () => { 
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Database connection successful");
  } 
  catch (err) {
    console.error("❌ Error in database connection:", err.message);
    process.exit(1); // Optional: Exit the app if DB connection fails
  }
}

