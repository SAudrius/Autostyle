"use server";
import { jwtVerify,SignJWT } from "jose";
import { cookies } from "next/headers";

import { getUserByEmail } from "@/lib/data/users";

import { getJwtSecretKey } from "./authEdge";

const stringToUint8Array = (str: string): Uint8Array =>
  new TextEncoder().encode(str);

export const authLogin = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    return;
  }
  const authToken = await new SignJWT({
    userId: user.id,
    iat: Date.now(),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  })
    .setProtectedHeader({ alg: "HS256" }) // Specify the algorithm
    .setIssuedAt() // Set the issued-at time
    .sign(stringToUint8Array(getJwtSecretKey()));
  cookies().set("auth", authToken);
};

export const tokenDataByToken = async (token: string) => {
  const secret = stringToUint8Array(getJwtSecretKey());
  console.log("secret ===", secret);
  try {
    const { payload } = await jwtVerify<JwtData>(token, secret);
    return payload;
  } catch (err) {
    // console.error("Invalid token or secret key:", err);
    return;
  }
};


export const authLogout = async () => {
  cookies().delete("auth");
};
