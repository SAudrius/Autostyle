import { NextRequest } from "next/server";

import { auth } from "./lib/auth/authEdge";
import { authRoutes, publicRoutes } from "./routes";

export const middleware = async (req: NextRequest) => {
  const { nextUrl } = req;

  const cookies = req.cookies;
  const authCookie = cookies.get("auth");

  const isLoggedIn = await auth(authCookie?.value);
  // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isAuthRoute) {
    console.log('isAuthRoute ===', isAuthRoute);
    console.log('isLoggedIn ===', isLoggedIn);
    if (isLoggedIn) {
      return Response.redirect(new URL("/account", nextUrl));
    }
    // TODO: Check email veryfied
    return;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  return;
};

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
