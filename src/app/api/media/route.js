import { connectDB } from "@/lib/db";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import MediaModel from "@/models/Media.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized or Not Admin.");
    }

    await connectDB();

    const searchParams = request.nextUrl.searchParams;

    const page = parseInt(searchParams.get("page"), 10) || 0;
    const limit = parseInt(searchParams.get("limit"), 10) || 0;

    // we have three types of delete
    const deleteType = searchParams.get("deleteType");
    // soft delete, restore soft delete and permanent delete.
    let filter = {};
    if (deleteType === "SD") {
      filter = { deletedAt: null };
    } else if (deleteType === "PD") {
      filter = { deletedAt: { $ne: null } };
    }

    const mediaData = await MediaModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit)
      .lean();
    const totalMedia = await MediaModel.countDocuments(filter);

    return NextResponse.json({
      mediaData: mediaData,
      hasMore: (page + 1) * limit < totalMedia,
    });
  } catch (error) {
    return catchError(error);
  }
}
