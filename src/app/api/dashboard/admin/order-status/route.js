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

    const salesStatus = await OrderModel.aggregate([
      {
        $match: {
          deletedAt: null,
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {count: 1},
      },
    ]);
    console.log("Sales status data Data:", salesStatus);
    return response(
      true,
      200,
      "Sales status data fetched successfully.",
      salesStatus,
    );
  } catch (error) {
    return catchError(error);
  }
}
