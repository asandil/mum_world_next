import { orderStatus } from "@/lib/utils";
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  ordernote: {
    type: String,
    required: false,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      variantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
        required: true,
      },
      name: { type: String, required: true},
      qty: { type: String, required: true},
      mrp: { type: String, required: true},
      sellingPrice: { type: String, required: true},
    },
  ],
  subtotal: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  couponDiscountAmount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  discount: {
    type: String,
    enum: orderStatus,
    default: "pending"
  },
});
