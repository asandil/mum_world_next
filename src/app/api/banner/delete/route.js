import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import BannerModel from "@/models/BannerAndAds.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized Or Not an Admin.");
    }

    await connectDB();

    const payload = await request.json();
    const ids = payload.ids || [];
    const deleteType = payload.deleteType;

    if (!Array.isArray(ids) || ids.length === 0) {
      return response(false, 400, "Invalid or empty id list.");
    }

    const data = await BannerModel.find({ _id: { $in: ids } }).lean();
    if (!data.length) {
      return response(false, 404, "Data Not Found.");
    }

    if (!["SD", "RSD"].includes(deleteType)) {
      return response(
        false,
        404,
        "Invalid delete operation. Delete type should be SD or RSD for this route."
      );
    }

    if (deleteType === "SD") {
      await BannerModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: new Date().toISOString() } }
      );
    } else {
      await BannerModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: null } }
      );
    }

    return response(
      true,
      200,
      deleteType === "SD" ? "Data moved into trash" : "Data Restored"
    );
  } catch (error) {
    return catchError(error);
  }
}
