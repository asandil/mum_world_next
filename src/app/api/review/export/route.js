import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import ReviewModel from "@/models/Review.model";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized or Not Admin.");
    }

    await connectDB();

    const filter = {
      deleteAt: null,
    };

    const getReview = await ReviewModel.find(filter)
      .sort({ createAt: -1 })
      .lean();

    if (!getReview) {
      return response(false, 403, "Collection Empty.");
    }

    return response(true, 200, "Data Found", getReview);
  } catch (error) {
    return catchError(error);
  }
}
