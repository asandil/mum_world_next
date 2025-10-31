import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import BannerModel from "@/models/BannerAndAds.model";

export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized or Not Admin.");
    }

    await connectDB();

    const payload = await request.json();

    const schema = zSchema.pick({
      name: true,
      discountPercentage: true,
      media: true,
    });

    const validate = schema.safeParse(payload);

    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields.", validate.error);
    }

    const bannerData = validate.data;

    const newBanner = new BannerModel({
      name: bannerData.name,
      discountPercentage: bannerData.discountPercentage,
      media: bannerData.media,
    });

    await newBanner.save();
    return response(true, 200, "Banner added successfully.");
  } catch (error) {
    return catchError(error);
  }
}
