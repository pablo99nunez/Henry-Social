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
import http from "http";
import { Server } from "socket.io";
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

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected",socket.id)

  socket.on("send_message", (data) => {
    io.emit("receive_message",data)
  })

  socket.on("disconnect",()=> {
      console.log("User Disconnected", socket.id)
  })
});

server.listen(process.env.PORT, () => {
  console.log("Server listening at " + process.env.PORT);
  axios.defaults.baseURL =
    process.env.MODE === "PRODUCTION"
      ? "https://henry-social-back.herokuapp.com"
      : "http://localhost:3001";
});

export default app;
