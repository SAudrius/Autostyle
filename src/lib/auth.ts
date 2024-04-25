"use server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getUserByEmail } from "@/lib/data/users";
import { getJwtSecretKey } from "@/middleware";

export const authLogin = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    return;
  }
  const authToken = await new SignJWT({
    userId: user.id,
    iat: Date.now(),
    exp: Math.floor(Date.now() / 1000) + 60,
  })
    .setProtectedHeader({ alg: "HS256" }) // Specify the algorithm
    .setIssuedAt() // Set the issued-at time
    .sign(new TextEncoder().encode(getJwtSecretKey()));
  cookies().set("auth", authToken);
};

export const authLogout = () => {
  cookies().delete("auth");
  redirect("/");
};
