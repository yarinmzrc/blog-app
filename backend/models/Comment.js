import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create schema for todo
const CommentSchema = new Schema({
  text: {
    type: String,
    required: [true, "The comment text field is required"],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

// Create model for comment
const Comment = mongoose.model("comment", CommentSchema);
export default Comment;
