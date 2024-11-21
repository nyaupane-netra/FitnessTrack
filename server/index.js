import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js"



const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/api/user/", UserRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });

app.get("/", async (req, res) => {
    res.status(200).json({
      message: "Hello from Netra",
    });
  });

  const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("Connected to Mongo DB"))
      .catch((err) => {
        console.error("failed to connect with mongo");
        console.error(err);
      });
  };

  const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 8080;  // Use the environment variable PORT if available
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (err) {
        console.log("Error starting server:", err);
    }
};

startServer();