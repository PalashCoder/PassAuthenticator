import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/password_manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
