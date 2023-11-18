import mongoose from "mongoose";
let isConnected = false;
const mongoUri = process.env.MONGO_URI;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongodb already connected!");
    return;
  } else {
    try {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
      console.log("connected to the db!");
    } catch (error) {
      console.log(error);
    }
  }
};
