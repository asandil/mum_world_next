import { connectDB } from "@/lib/db";
import { response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.model";

export async function PUT(request) {
  try {
    await connectDB();
    const payload = await request.json();
    // vlidation schema
    const validationschema = zSchema.pick({ email: true, password: true });

    const validatedData = validationschema.safeParse(payload);

    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalid or missing input field",
        validatedData.error
      );
    }

    const { email, password } = validatedData.data;

    // check already registered user
    const getUser = await UserModel.findOne({ deletedAt: null, email }).select(
      "+password"
    );
    if (!getUser) {
      return response(false, 404, "User not found.");
    }

    getUser.password = password;
    await getUser.save();
    return response(true, 200, "Password Updated Succesfully.");
  } catch (error) {}
}
