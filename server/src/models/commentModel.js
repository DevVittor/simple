import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
    author: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      minLength: 5,
      maxLength: 150,
      required: true,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comments", commentSchema);

export default commentModel;
