"use server";
import { jwtVerify } from "jose";

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
