import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// routes
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import ChatRoute from "./routes/ChatRoute.js";
import MessageRoute from "./routes/MessageRoute.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

// middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use("/images", express.static("images"));

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);

const CONNECTION = process.env.MONGODB_CONNECTION;
mongoose
  .connect(CONNECTION, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
  )
  .catch((error) => console.log(`${error}`));
