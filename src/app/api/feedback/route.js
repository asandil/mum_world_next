// app/api/feedback/route.js
import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import FeedBackForm from "@/models/FeedBackForm";

export async function POST(request) {
  try {
    await connectDB();

    const validationSchema = zSchema.pick({
      name: true,
      email: true,
      feedBackCategory: true,
      rating: true,
      bio: true,
      feedBackCity: true,
      feedBackAddress: true,
    });

    const payload = await request.json();

    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalid or missing input field",
        validatedData.error
      );
    }

    const { name, email, feedBackCategory, rating, bio, feedBackAddress, feedBackCity } = validatedData.data;

    // Create new feedback
    const newFeedback = new FeedBackForm({ 
      name, 
      email, 
      feedBackCategory, 
      rating, 
      bio,
      feedBackAddress,
      feedBackCity,
    });

    await newFeedback.save();

    return response(true, 200, "Feedback submitted successfully!");

  } catch (error) {
    return catchError(error);
  }
}

export async function GET(){
  try {
    await connectDB();

    const feedback = await FeedBackForm.find({ rating: { $gte: 4 } })
      .sort({ createdAt: -1 })
      .select('name rating bio feedBackCategory createdAt feedBackAddress feedBackCity  ').lean()

      return response(true, 200, "Feedback fetched successfully", {
        feedback,
        total: feedback.length
      });
 
  } catch (error) {
    return catchError(error)
  }
}