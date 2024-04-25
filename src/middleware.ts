import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

import { authRoutes, publicRoutes } from "./routes";

export const middleware = async (req: NextRequest) => {
  const { nextUrl } = req;

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

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_TOKEN;
  if (!secret) {
    console.error("JWT secret token is missing or invalid.");
    throw new Error("Enviroment varible is not here");
  }
  return secret;
};

export const auth = async (cookie: string | undefined) => {
  const token = cookie;
  if (!token) {
    return false;
  }
  try {
    const decoded = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey()),
    );
    console.log("decoded ===", decoded);
    if (!decoded || !decoded.payload.exp) {
      throw new Error("JWT token is not valid");
    }
    if (decoded.payload.exp > Math.floor((Date.now() / 1000) * 1000 * 60)) {
      return false;
    }
  } catch (err) {
    return false;
  }
  // const authToken
  // check for auth cookie
  return true;
};

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
