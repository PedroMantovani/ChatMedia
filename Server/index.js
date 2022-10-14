import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoute from "./Routes/AuthRoute.js";
import ChatRoute from "./Routes/ChatRoute.js";
import MessageRoute from "./Routes/MessageRoute.js";
import UserRoute from "./routes/UserRoute.js";

dotenv.config();
const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(cors());
app.use(express.static("public"));
app.use("/images", express.static("images"));

// Routes
app.use("/auth", AuthRoute);
app.use("/chat", ChatRoute);
app.use("/user", UserRoute);
app.use("/message", MessageRoute);

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
