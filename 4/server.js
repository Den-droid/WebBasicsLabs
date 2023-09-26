const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");

const port = 3000;

let users = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  socket.on("chat message", (message) => {
    let user = users.find((user) => {
      return user.username === message.sender ? true : false;
    });
    io.emit("chat message", { user: user, message: message.message });
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/pages/index.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname + "/pages/chat.html"));
});

app.post("/api/login", (req, res) => {
  let { username } = req.body;

  let user = users.find((user) => {
    return user.username === username ? true : false;
  });

  if (user) {
    return res.json({
      error: "User with such username exists! Try another username!",
    });
  } else {
    users.push({ username: username, color: getRandomColor() });

    return res.json({ username: username });
  }
});

http.listen(port);

function getRandomColor() {
  return {
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255,
  };
}
