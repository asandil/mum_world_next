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

    const validationSchema = zSchema.pick({
      otp: true,
      email: true,
    });

    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
      return response(
        false,
        404,
        "Invalid or missing input field.",
        validatedData.error
      );
    }

    const { email, otp } = validatedData.data;

    const getOtpData = await OTPModel.findOne({ email, otp });
    if (!getOtpData) {
      return response(
        false,
        404,
        "Invalid or expired otp.",
        validatedData.error
      );
    }

    const getUser = await UserModel.findOne({ deletedAt: null, email }).lean();
    if (!getUser) {
      return response(false, 404, "User not found.", validatedData.error);
    }

    // setting cookie and token for login.
    const loggedInUserData = {
      _id: getUser._id.toString(),
      role: getUser.role,
      name: getUser.name,
      email:getUser.email,
      avatar: getUser.avatar,
    };

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT(loggedInUserData)
      .setIssuedAt()
      .setExpirationTime("24h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    const cookiesStore = await cookies();

    cookiesStore.set({
      name: "access_token",
      value: token,
      httpOnly: process.env.NODE_ENV === "production",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // remove otp after validation
    await getOtpData.deleteOne();

    return response(true, 200, "Login succesfull.", loggedInUserData);
  } catch (error) {
    return catchError(error);
  }
}
