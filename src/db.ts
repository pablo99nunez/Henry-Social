/* eslint-disable @typescript-eslint/no-var-requires */

require("dotenv").config();
const mongoose = require("mongoose");

function main() {
  mongoose
    .connect(
      `mongodb+srv://HenrySocial:${process.env.MONGO_PASSWORD}@cluster0.cvmsj.mongodb.net/HS-DB?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("MongoDB connected succesfully");
    })
    .catch((error: any) => {
      console.log(error);
    });
}

main();
