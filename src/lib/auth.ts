"use server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getUserByEmail } from "@/lib/data/users";

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_TOKEN;
  if (!secret) {
    console.error("JWT secret token is missing or invalid.");
    throw new Error("Enviroment varible is not here");
  }
  return secret;
};

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
