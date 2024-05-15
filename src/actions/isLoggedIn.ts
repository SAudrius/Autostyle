"use server";

import { auth } from "@/lib/auth/authEdge";
import { cookies } from "next/headers";

export const isUserLoggedIn = async () => {
  const authCookie = cookies().get("auth");
  if (!authCookie) {
    return false;
  }

  const isLoggedIn = await auth(authCookie?.value);
  return isLoggedIn;
};
