import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import CategoryModel from "@/models/Category.model";
import OrderModel from "@/models/Order.model";
import ProductModel from "@/models/Product.model";
import UserModel from "@/models/User.model";
import ReviewModel from "@/models/Review.model";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized or Not Admin.");
    }

    await connectDB();

    const [
      category,
      product,
      customer,
      order,
      monthlySales,
      orderStatus,
      latestOrders,
      latestReviews,
    ] = await Promise.all([
      CategoryModel.countDocuments({ deletedAt: null }),
      ProductModel.countDocuments({ deletedAt: null }),
      UserModel.countDocuments({ deletedAt: null }),
      OrderModel.countDocuments({ deletedAt: null }),
      OrderModel.aggregate([
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
              day: { $dayOfMonth: "$createdAt" },
            },
            totalSales: { $sum: "$totalAmount" },
            orderCount: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 },
        },
      ]),
      OrderModel.aggregate([
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
          $sort: { count: 1 },
        },
      ]),
      OrderModel.find({ deletedAt: null })
        .sort({ createdAt: -1 })
        .limit(20),
      ReviewModel.find({ deletedAt: null })
        .sort({ createdAt: -1 })
        .populate({
          path: "product",
          select: "name, media",
          populate: {
            path: "media",
            select: "secure_url",
          },
        }),
    ]);

    return response(true, 200, "Dashboard data fetched successfully.", {
      counts: { category, product, customer, order },
      monthlySales,
      orderStatus,
      latestOrders,
      latestReviews,
    });
  } catch (error) {
    return catchError(error);
  }
}
