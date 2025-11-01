import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import { isValidObjectId } from "mongoose";
import BannerModel from "@/models/BannerAndAds.model";
import MediaModal from "@/models/Media.model";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized Or Not Admin.");
    }

    await connectDB();

    const getParams = await params;
    const id = getParams.id;

    const filter = {
      deletedAt: null,
    };

    if (!isValidObjectId(id)) {
      return response(false, 400, "Invalid object id.");
    }

    filter._id = id;

    const getBanner = await BannerModel.findOne(filter)
      .populate("media", "_id secure_url")
      .lean();

    if (!getBanner) {
      return response(false, 404, "Banner not found.");
    }

    return response(true, 200, "Banner found.", getBanner);
  } catch (error) {
    return catchError(error);
  }
}
