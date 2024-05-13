const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Post = require("../models/post.js");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value))
        throw new Error(
          `Please create a strong password with Min. 8 chars, Min. 1 -
            uppercase, lowercase, number & special symbol`
        );
    },
  },
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.password;
  return userObj;
};

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "createdBy",
});

//Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

//Delete user posts when an user is removed (cascading delete posts)
userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const user = this;
    try {
      await Post.deleteMany({ createdBy: user._id });
      next();
    } catch (error) {
      resizeBy.status(500).send(error);
    }
  }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;
