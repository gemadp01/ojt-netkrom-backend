import mongoose from "mongoose";

const connectMongoose = async () => {
  await mongoose
    .connect(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    )
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("MongoDB connection error:", error);
    });
};

export default connectMongoose;
