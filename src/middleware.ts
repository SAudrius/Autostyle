import { NextRequest } from "next/server";

import { auth } from "@/lib/auth";

import { authRoutes, publicRoutes } from "./routes";

export const middleware = async (req: NextRequest) => {
  const { nextUrl } = req;
  console.log("nextUrl ===", nextUrl);

  const cookies = req.cookies;
  const authCookie = cookies.get("auth");

  const isLoggedIn = await auth(authCookie?.value);
  console.log("isLoggedIn ===", isLoggedIn);
  // TODO: FOR Auth google maybe i will need api route
  // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isAuthRoute) {
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
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
