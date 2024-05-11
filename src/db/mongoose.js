const mongoose = require("mongoose");

//Mongo DB Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to DB"));
