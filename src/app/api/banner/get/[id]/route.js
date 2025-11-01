import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/db";
import { response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import BannerModel from "@/models/BannerAndAds.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");

    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized or Not Admin.");
    }

    await connectDB();

    const payload = await request.json();

    const schema = zSchema.pick({
      _id: true,
      name: true,
      discountPercentage: true,
    });

    const validate = schema.safeParse(payload);

    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields.", validate.error);
    }

    const validatedData = validate.data;

    const getBanner = await BannerModel.findOne({
      deletedAt: null,
      _id: validatedData._id,
    });

    if (!getBanner) {
      return response(false, 404, "Data not found.");
    }

    getBanner.name = validatedData.name;
    getBanner.name = validatedData.discountPercentage;
    getBanner.media = validatedData.media;

    await getBanner.save();

    return response(true, 200, "Banner updated succesfully.");
  } catch (error) {
    return catchError(error);
  }
}
