import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import UserModel from "@/models/User.model";

export async function PUT(request){
  try {
    await connectDB()
    const auth = await isAuthenticated("user")
    if(!auth.isAuth){
      return response(false, 401, "Unauthorized")
    }

    const userId = auth.userId;
    const user = await UserModel.findById(userId);

    if(!user){
      return response(false, 404, "User not found.")
    }

    const formData = await request.formData()
    const file = formData.get("file")

    if(file){
      const fileBuffer = await file.arrayBuffer()
      const base64Image = `data:${file.type};base64,${Buffer.from(fileBuffer).toString()}`
    }

    const uploadFile = await cloudinary.uploader.upload(base64Image,{
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    })
    

    return response(true, 200, "User data.", user)


  } catch (error) {
    catchError(error)
  }
}