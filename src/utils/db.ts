import mongoose, { ConnectOptions } from "mongoose";

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL environment variable is not defined.");
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;
