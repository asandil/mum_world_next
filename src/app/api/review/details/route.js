import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import ReviewModel from "@/models/Review.model";

export async function GET(request){
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams
    const productId = searchParams.get('productId')
    if(!productId){
      return response(false, 404, 'Product is missing.')
    }

    const reviews = await ReviewModel.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId), deleteAt: null }},
      { $group: { _id: "$rating", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ])

    return response(true, 200, "Review details.", reviews)

  } catch (error) {
    return catchError(error)
  }
}