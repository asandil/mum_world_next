import { isAuthenticated } from "@/lib/authentication";
import { response } from "@/lib/helperFunction";

export async function GET(){
  try {
    const auth = await isAuthenticated();
    if(!auth.isAuth){
      return response(false, 403, "Unauthorized or Not Admin");
    }
  } catch (error) {
    return catchError(error);
  }
}