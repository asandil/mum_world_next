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

    const monthlySales = await OrderModel.aggregate([
      {
        $match: {
          deletedAt: null,
          status: { $in: ["processing", "shipped", "delivered"] },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalSales: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    console.log("Monthly Sales Data:", monthlySales);
    return response(
      true,
      200,
      "Monthly sales data fetched successfully.",
      monthlySales,
    );
  } catch (error) {
    return catchError(error);
  }
}
