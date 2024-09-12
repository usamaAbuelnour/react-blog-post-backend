const express = require("express");
require("express-async-errors");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");

const app = express();

const port = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

connectDB();

app.use("/", userRouter);
app.use("/posts", postRouter);

app.use(errorHandler);

app.listen(port, () => console.log("server up and running on port " + port));
