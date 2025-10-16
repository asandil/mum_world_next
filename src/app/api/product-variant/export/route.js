import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import ProductModel from "@/models/Product.model";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized Or Not Admin.");
    }

    await connectDB();

    const filter = {
      deletedAt: null,
    };

    const getProduct = await ProductModel.find(filter).select('-media -description').sort({createdAT: -1}).lean()

    if(!getProduct){
      return response(false, 403, "Collection Empty.")
    }

    return response(true, 200, "Data Found.", getProduct)
    
  } catch (error) {
    return catchError(error);
  }
}
