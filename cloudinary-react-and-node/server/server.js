const dotenv = require("dotenv");
const express = require("express");
const app = express();
var cors = require("cors");
const uploadRoute = require("./routes/image");
const connectDb = require("./db/connect");
const mongoose = require("mongoose");

dotenv.config();

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/", uploadRoute);

const port = process.env.PORT || 5001;

// connect to the database
connectDb();

mongoose.connection.once("open", () => {
  console.log("Connected to mongo DB");
  app.listen(port, () => {
    console.log("listening on 5001");
  });
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});
