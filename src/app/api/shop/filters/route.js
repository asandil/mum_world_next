import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import CategoryModel from "@/models/Category.model";
import ProductVariantModel from "@/models/ProductVarient.model";

export async function GET() {
  try {
    await connectDB();

    const [categories, colors, sizes] = await Promise.all([
      CategoryModel.find({ deletedAt: null }).lean(),
      ProductVariantModel.distinct("color"),
      ProductVariantModel.aggregate([
        { $sort: { _id: 1 } },
        { $group: { _id: "$size", first: { $first: "$_id" } } },
        { $sort: { first: 1 } },
        { $project: { _id: 0, size: "$_id" } },
      ]).then((result) => result.map((item) => item.size)),
    ]);

    return response(true, 200, "Shop filters fetched successfully.", {
      categories,
      colors,
      sizes,
    });
  } catch (error) {
    return catchError(error);
  }
}
