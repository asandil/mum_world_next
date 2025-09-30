import { emailVerificationLink } from "@/email/emailVerificationLink";
import { otpEmail } from "@/email/otpEmail";
import { connectDB } from "@/lib/db";
import { catchError, generateOTP, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";
import z from "zod";

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();

    const validationSchema = zSchema
      .pick({
        email: true,
      })
      .extend({
        password: z.string(),
      });

    const validatedData = validationSchema.safeParse(payload);
    console.log("kola!!!!!!!!!!!!!!!", validatedData);

    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalid or missing input field",
        validatedData.error
      );
    }

    const { email, password } = validatedData.data;

    const getUser = await UserModel.findOne({ deletedAt:null, email }).select("+password");
    console.log("get login user details", getUser);
    if (!getUser) {
      return response(false, 400, "Invalid login credentials");
    }

    // resend email verification link if user not verified.
    if (!getUser.isEmailVerified) {
      const secret = new TextEncoder().encode(process.env.SECRET_KEY);

      const token = await new SignJWT({
        userId: getUser._id.toString(),
      })
        .setIssuedAt()
        .setExpirationTime("24h")
        .setProtectedHeader({ alg: "HS256" })
        .sign(secret);

      await sendMail(
        "Email Verification request from Developer Alok",
        email,
        emailVerificationLink(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`
        )
      );

      return response(
        false,
        401,
        "Youe email is not verified. We have sent a verification link to your registered email address.."
      );
    }

    // password verification
    const isPasswordVerified = await getUser.comparePassword(password);

    if (!isPasswordVerified) {
      return response(false, 400, "Invalid login credentials.");
    }

    // otp generation
    // first delete the older otp
    await OTPModel.deleteMany({ email });
    const otp = generateOTP();

    // storing otp into databse
    const newOtpData = new OTPModel({
      email,
      otp,
    });

    await newOtpData.save();

    console.log("OTP saved to database:", { email, otp });

    // Debug the email sending process
    console.log("Sending OTP email to:", email);
    // console.log("OTP email template:", otpEmail(otp));

    const otpEmailStatus = await sendMail(
      "Your login verification code",
      email,
      otpEmail(otp)
    );

    console.log("SendMail function response:", otpEmailStatus);

    if (!otpEmailStatus.success) {
      console.error("SendMail failed with:", otpEmailStatus);
      return response(false, 400, "Failed to send OTP.");
    }
    return response(true, 200, "Please verify your device.");
  } catch (error) {
    return catchError(error);
  }
}
