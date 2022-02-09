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
const port = 8800;

// Setting up server with socket.io
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

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

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

const server = http.listen(port, () => {
  const { port } = server.address();
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

// socket io functions

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => userId === user.userId);
};

// connection
io.on("connection", (socket) => {
  console.log(" a user connected.");
  // take userId and socketId from user, client-side.
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  //disconnection
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  // send and get messages
  socket.on("sendMessage", ({ conversation, senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      conversation,
      senderId,
      text,
    });
  });

  socket.on("resetCounter", ({ conversation, receiverId }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getReset", {
      conversation,
    });
  });
});
