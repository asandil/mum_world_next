import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import OrderModel from "@/models/Order.model";
import ProductModal from "@/components/ProductModal";
import ProductVariantModel from "@/models/ProductVarient.model";
import MediaModel from "@/models/Media.model";

export async function GET() {
  try {
    await connectDB();
    const auth = await isAuthenticated("user");
    if (!auth.isAuth) {
      return response(false, 401, "Unauthorized");
    }

    const userId = auth.userId;

    // get all Orders

    const orders = await OrderModel.find({ user: userId })
      .populate("products.productId", "name slug")
      .populate({
        path: "products.variantId",
        populate: { path: "media" },
      })
      .lean();

    return response(true, 200, "Order info", orders);
  } catch (error) {
    return catchError(error);
  }
}
