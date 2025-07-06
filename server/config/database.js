import mongoose from "mongoose";

// Function to connect to the MongoDB Database

const connectDatabase = async () => {
  mongoose.connection.on('connected', () => console.log("Database Connected Successfully!"));

  await mongoose.connect(`${process.env.MONGODB_URI}`);
}

export default connectDatabase;