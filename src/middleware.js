import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";
import { USER_DASHBOARD, WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    const pathname = request.nextUrl.pathname;
    const hasToken = request.cookies.has("access_token");

    if (!hasToken) {
      // if the user is not logged and trying to accessa protected route, redirect to login page.
      if (!pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
      }
      return NextResponse.next(); // Allow access to auth routes if not logged in.
    }

    // Verift token
    const access_token = request.cookies.get("access_token").value;
    const { payload } = await jwtVerify(
      access_token,
      new TextEncoder().encode(process.env.SECRET_KEY)
    );

    console.log(" User LoggedIn Info ", payload);

    const role = payload.role;

    // prevent logged-in users from accessing auth routes
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(
        new URL(
          role === "admin" ? ADMIN_DASHBOARD : USER_DASHBOARD,
          request.nextUrl
        )
      );
    }

    // protct admin route
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
    }

    // protct user route
    if (pathname.startsWith("/my-account") && role !== "user") {
      return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/my-account/:path*", "/auth/:path*"],
};
