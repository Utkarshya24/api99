import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DATABASE IS CONNECTED ON ${db.connection.host}`);
  } catch (error) {
    console.log("ERROR", error);
  }
};

export { connectDB };
