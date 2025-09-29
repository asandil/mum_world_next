import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();

    // vlidation schema
    const validationschema = zSchema.pick({
      otp: true,
      email: true,
    });

    const validatedData = validationschema.safeParse(payload);

    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalid or missing input field",
        validatedData.error
      );
    }

    const { email, otp } = validatedData.data;

    // check otp in database user
    const getOtpData = await OTPModel.findOne({ email, otp });
    if (!getOtpData) {
      return response(false, 404, "Invalid or expire otp.");
    }

    // check user in database only, we dont do any operation.
    const getUser = await UserModel.findOne({ deleteAt: null, email }).lean();
    if (!getUser) {
      return response(false, 404, "User not found.");
    }

    // remove otp after validation
    await getOtpData.deleteOne();

    return response(true, 200, "OTP verified.");
  } catch (error) {
    return catchError(error);
  }
}
