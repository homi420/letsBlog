import mongoose from "mongoose";
const RatingsSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },

    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const BlogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title Cannot Be Empty!"],
    unique: true,
  },
  category: {
    type: String,
    required: [true, "Category Is Required!"],
  },
  blog: {
    type: String,
    required: [true, "Blog Cannot Be Empty!"],
  },
  description: {
    type: String,
    required: [true, "Description could not be empty!"],
  },
  ratings: [{ rating: Number, userId: String }],
  avgRating: {
    type: Number,
    required: true,
    default: 0,
  },
  totalRating: {
    type: Number,
    required: true,
    default: 0,
  },
});
const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;
