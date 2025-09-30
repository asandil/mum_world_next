// models/Feedback.model.js
import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    feedBackCategory: {
      type: String,
      required: [true, "Feedback category is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    bio: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt automatically
  }
);

export default mongoose.models.Feedback ||
  mongoose.model("FeedBackForm", FeedbackSchema);
