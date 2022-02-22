import express from "express";
require("dotenv").config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log("Server listening at " + process.env.PORT);
});

export default app;
