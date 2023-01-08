import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create schema for todo
const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, "The post title field is required"],
  },
  body: {
    type: String,
    required: [true, "The post body field is required"],
  },
  category: {
    type: String,
    enum: ["Programming", "Data", "Lifestyle"],
    required: [true, "The post category field is required"],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  UpdatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Create model for post
const Post = mongoose.model("post", PostSchema);
export default Post;
