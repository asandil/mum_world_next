import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/db";
import { response } from "@/lib/helperFunction";
import OrderModel from "@/models/Order.model";

export async function GET() {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized or Not Admin");
    }

    await connectDB();

    const latestOrder = await OrderModel.find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .limit(20);

    return response(
      true,
      200,
      "Latest order data fetched successfully.",
      latestOrder,
    );
  } catch (error) {
    return catchError(error);
  }
}
