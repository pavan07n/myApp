require("./db/mongoose.js");
const express = require("express");
const passport = require("passport");
const userRouter = require("./routers/userRouter.js");
const postRouter = require("./routers/postRouter.js");
const app = express();

//Configure express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());

//Setting up routers
app.use(userRouter);
app.use(postRouter);

// configure port
const port = process.env.PORT;

app.listen(port, () => console.log(`Server is up on port ${port} `));
