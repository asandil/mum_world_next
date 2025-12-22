import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import z from "zod";

export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json();

    const productSchema = z.object({
      productId: z.string().length(24, "Invalid product id format"),
      variantId: z.string().length(24, "Invalid variant id format"),
      name: z.string().min(1),
      qty: z.number().min(1),
      mrp: z.number().nonnegative(),
      sellingPrice: z.number().nonnegative(),
    });

    const orderSchema = zSchema
      .pick({
        name: true,
        email: true,
        phone: true,
        address: true,
        street: true,
        country: true,
        state: true,
        city: true,
        pinecode: true,
        landmark: true,
        ordernote: true,
      })
      .extend({
        userId: z.string().optional(),
        razorpay_payment_id: z.string().min(3, "Payment id is required."),
        razorpay_order_id: z.string().min(3, "Order id is required."),
        razorpay_signature: z.string().min(3, "Signature id is required."),
        subtotal: z.number().nonnegative(),
        discount: z.number().nonnegative(),
        couponDiscountAmount: z.number().nonnegative(),
        totalAmount: z.number().nonnegative(),
        products: z.array(productSchema),
      });

    const validate = orderSchema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields.", {
        error: validate.error,
      });
    }

    const validatedDate = validate.data

    // payment verification
    const verification = validatePaymentVerification({
      order_id: validatedDate.razorpay_order_id,
      payment_id: validatedDate.razorpay_payment_id,
    }, validatedDate.razorpay_signature, process.env.RAZORPAY_KEY_SECRET)

    let paymentVerification = false
    if(verification){
      paymentVerification = true
    }

    

  } catch (error) {
    return catchError(error);
  }
}
