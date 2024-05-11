const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: { type: String },
    coordinates: [],
  },
});

// Create geospatial index on the location field
postSchema.index({ location: "2dsphere" });

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
