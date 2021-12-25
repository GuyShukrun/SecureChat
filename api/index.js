require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoute = require("./routes/users");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
// const { v4: uuidv4 } = require("uuid");
const port = 8800;
app.use("/uploads", express.static("public")); // uploads image as public folder
app.use(cors());

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to Database");
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));

// routes for api calls
app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
