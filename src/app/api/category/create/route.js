import { connectDB } from "@/lib/db";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import CategoryModel from "@/models/Category.model";

export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized or Not Admin .");
    }

    await connectDB();

    const payload = await request.json();

    const schema = zSchema.pick({
      name: true,
      slug: true,
    });

    const validate = schema.safeParse(payload);

    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields", validate.error);
    }

    const { name, slug } = validate.data;

    const newCategory = new CategoryModel({
      name,
      slug,
    });

    await newCategory.save();
    return response(true, 200, "Category added succesfully");
  } catch (error) {
    return catchError(error);
  }
}
