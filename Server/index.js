import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoute from "./Routes/AuthRoute.js";

dotenv.config();
const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(cors());

// Routes
app.use("/auth", AuthRoute);

// Middleware
mongoose
  .connect(process.env.STRING_CONNECTION_DB, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    })
  )
  .catch((error) => console.error(error));
