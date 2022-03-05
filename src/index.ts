/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
// const bodyParser = require('body-parser');

const cors = require("cors");
const morgan = require("morgan");
import "dotenv/config.js";
import axios from "axios";
import userRouter from "./Routes/UserRoutes";
import postRouter from "./Routes/PostRoutes";
import stripeRouter from "./Routes/StripeRoutes";
import conversationRouter from "./Routes/ConversationRoutes";
import http from "http";
import { Server } from "socket.io";
import User, { IUser } from "./models/User";
import Post from "./models/Post";
import { auth } from "./services/firebase/firebase";
const app: express.Application = express();
app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.get("/", (req, res) => {
  // res.render(__dirname + "/public/index.html");
  res.send("working");
});

app.use("/", userRouter);
app.use("/", postRouter);
app.use("/", stripeRouter);
app.use("/conversation", conversationRouter);

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

type User = {
  userId: string;
  name: string;
  avatar: string;
  username: string;
  socketId: string;
};

export let users: User[] = [];

const addUser = async (userId: string, socketId: string) => {
  if (!users.some((user: User) => user.userId === userId)) {
    try {
      const userDb = await User.findById(userId);
      if (userDb && typeof userDb.avatar === "string" && userDb.username) {
        console.log({
          userId,
          name: userDb.name,
          avatar: userDb.avatar,
          username: userDb.username,
          socketId,
        });
        users.push({
          userId,
          name: userDb.name,
          avatar: userDb.avatar,
          username: userDb.username,
          socketId,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

const removeUser = (socketId: string) => {
  users = users.filter((e) => e.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("add_user", async (userId: string) => {
    await addUser(userId, socket.id);
    console.log("Users connected:", users);

    io.emit("get_users", users);
  });
  socket.on("send_notification", async (id: string) => {
    console.log("Sending notis");
    Post.findById(id)
      .populate("author", "_id username")
      .then((post) => {
        if (post) {
          const destiny = users.find(
            (user) => user.username === post.author.username
          );
          if (destiny) {
            io.to(destiny.socketId).emit("get_notification");
          }
        }
      });
  });
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
  socket.on("send_private_message", (data) => {
    const destiny = users.find((e) => e.userId === data.receiver);
    console.log("Devolviendo mensaje al cliente", destiny);

    if (destiny) {
      socket.to(destiny.socketId).emit("receive_private_message", data);
    }
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    removeUser(socket.id);
    io.emit("get_users", users);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server listening at " + process.env.PORT);

  axios.defaults.baseURL =
    process.env.MODE === "PRODUCTION"
      ? "https://henry-social-back.herokuapp.com"
      : "http://localhost:3001";
});

export default app;
