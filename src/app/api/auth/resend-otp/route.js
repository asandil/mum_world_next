import { otpEmail } from "@/email/otpEmail";
import { connectDB } from "@/lib/db";
import { catchError, generateOTP, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();

    // vlidation schema
    const validationschema = zSchema.pick({ email: true });

    const validatedData = validationschema.safeParse(payload);

    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalid or missing input field",
        validatedData.error
      );
    }

    const { email } = validatedData.data;

    // check user in database
    const getUser = await UserModel.findOne({ email });
    if (!getUser) {
      return response(false, 404, "User not found.");
    }

    // deleting old otp
    await OTPModel.deleteMany({ email });

    const otp = generateOTP();

    // storing otp into database
    const newOtpData = new OTPModel({ email, otp });

    await newOtpData.save();

    const otpSendStatus = await sendMail(
      "Your login verification code",
      email,
      otpEmail(otp)
    );
    if (!otpSendStatus.success) {
      return response(false, 400, "Failed to send OTP.");
    }
    return response(true, 200, "OTP send successfully.");
  } catch (error) {
    return catchError(error);
  }
}
