"use server";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import * as z from "zod";

import { authLogin } from "@/lib/auth";
import { createUserByData, getUserByEmail } from "@/lib/data/users";
import { registerSchema } from "@/schemas";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validValues = registerSchema.safeParse(values);
  if (!validValues.success) {
    return { error: "Fields are not valid" };
  }
  const { email, first_name, last_name, password, repeat_password } =
    validValues.data;
  console.log("email ===", email);
  if (password !== repeat_password) {
    return { error: "Password & repeat password do not match" };
  }
  const existingUser = await getUserByEmail(email);
  console.log("existingUser ===", existingUser);
  // eslint-disable-next-line no-extra-boolean-cast
  if (existingUser) {
    return { error: "This email has already in use" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUserByData(
    first_name,
    last_name,
    email,
    hashedPassword,
  );
  console.log("newUser ===", newUser);
  if (!newUser) {
    return { error: "Sometink went wrong" };
  }
  if (newUser?.affectedRows !== 1) return { success: "Somethink went wrong" };
  await authLogin(email);
  redirect("/account");
  return { success: "User is created" };
};
