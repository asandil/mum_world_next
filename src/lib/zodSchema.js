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
});
