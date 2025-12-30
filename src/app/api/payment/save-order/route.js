import { orderNotification } from "@/email/orderNotifiation";
import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OrderModel from "@/models/Order.model";
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
        pincode: true,
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

    const validatedData = validate.data;

    // Payment verification
    const verification = validatePaymentVerification(
      {
        order_id: validatedData.razorpay_order_id,
        payment_id: validatedData.razorpay_payment_id,
      },
      validatedData.razorpay_signature,
      process.env.RAZORPAY_KEY_SECRET
    );

    let paymentVerification = false;
    if (verification) {
      paymentVerification = true;
    }

    // Create the order in database
    const newOrder = await OrderModel.create({
      user: validatedData.userId,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      address: validatedData.address,
      street: validatedData.street,
      country: validatedData.country,
      state: validatedData.state,
      city: validatedData.city,
      pincode: validatedData.pincode,
      landmark: validatedData.landmark,
      ordernote: validatedData.ordernote,
      products: validatedData.products,
      discount: validatedData.discount,
      couponDiscountAmount: validatedData.couponDiscountAmount,
      totalAmount: validatedData.totalAmount,
      subtotal: validatedData.subtotal,
      payment_id: validatedData.razorpay_payment_id,
      order_id: validatedData.razorpay_order_id,
      status: paymentVerification ? "pending" : "unverified",
    });

    try {
      const orderDate = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const deliveryDate = new Date(
        Date.now() + 6 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const mailData = {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        address: validatedData.address,
        street: validatedData.street,
        country: validatedData.country,
        state: validatedData.state,
        city: validatedData.city,
        pincode: validatedData.pincode,
        landmark: validatedData.landmark,
        ordernote: validatedData.ordernote || "",
        order_id: validatedData.razorpay_order_id,
        payment_id: validatedData.razorpay_payment_id,
        order_date: orderDate,
        delivery_date: deliveryDate,
        status: paymentVerification ? "Confirmed" : "Unverified",
        subtotal: validatedData.subtotal,
        discount: validatedData.discount,
        couponDiscountAmount: validatedData.couponDiscountAmount,
        totalAmount: validatedData.totalAmount,
        products_count: validatedData.products.length,
        orderDetailsUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/order-details/${validatedData.razorpay_order_id}`,
        base_url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      };

      await sendMail(
        `Order Confirmation - ${validatedData.razorpay_order_id}`,
        validatedData.email,
        orderNotification(mailData)
      );
      // await sendMail("New order received", process.env.NODEMAILER_EMAIL, "order-placed-admin", mailData);
    } catch (error) {
      console.log(error);
    }

    return response(true, 200, "Order placed successfully.", {
      order_id: newOrder.order_id,
      status: newOrder.status,
      message: "Order created and confirmation email sent.",
    });
  } catch (error) {
    return catchError(error);
  }
}
