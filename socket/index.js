const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

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
    console.log("In reset in socket");
    const user = getUser(receiverId);
    console.log(user);
    io.to(user?.socketId).emit("getReset", {
      conversation,
    });
  });
});
