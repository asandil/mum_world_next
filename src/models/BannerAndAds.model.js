import mongoose from "mongoose";
import MediaModel from "./Media.model";

const bannerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    discountPercentage:{
      type: Number,
      required: true,
    },
    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: true,
      },
    ],
    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

bannerSchema.index({ category: 1 });

const BannerModel =
  mongoose.models.Banner || mongoose.model("Banner", bannerSchema, "banners");

export default BannerModel;
