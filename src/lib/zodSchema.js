import { z } from "zod";

export const zSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 6 characters long" })
    .max(64, { message: "Password must be at most 100 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter (A-Z)",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter (a-z)",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number (0-9)",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),

  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at moast 50 characters long" })
    .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),

  otp: z.string().regex(/^\d{6}$/, {
    message: "OTP must be a 6-digit numbers",
  }),
  bio: z
    .string()
    .refine((val) => val.trim().split(/\s+/).length >= 15, {
      message: "Bio must be at least 15 words",
    })
    .refine((val) => val.trim().split(/\s+/).length <= 150, {
      message: "Bio must be at most 150 words",
    }),
  feedBackCategory: z.enum(
    [
      "General Feedback",
      "Content Suggestion",
      "Medical Information",
      "Nutrition & Diet",
      "Pregnancy Fitness",
      "Mental Health",
      "Birth Preparation",
      "Postpartum Care",
      "Community Support",
      "Technical Issue",
      "Other",
    ],
    {
      required_error: "Please select a valid category.",
    }
  ),
  rating: z.number().min(1, "Rating is required").max(5, "Maximum rating is 5"),
  feedBackCity: z
    .string({
      required_error: "Please enter your city.",
    })
    .min(2, { message: "City must be at least 2 characters long." })
    .max(50, { message: "City must be at most 50 characters long." })
    .regex(/^[A-Za-z\s]+$/, "City can only contain letters and spaces."),

  feedBackAddress: z
    .string({
      required_error: "Please enter your address.",
    })
    .min(5, { message: "Address must be at least 5 characters long." })
    .max(100, { message: "Address must be at most 100 characters long." }),
});
