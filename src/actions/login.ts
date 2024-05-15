"use server";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import * as z from "zod";

import { authLogin } from "@/lib/auth/auth";
import { getUserByEmail } from "@/lib/data/users";
import { loginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validValues = loginSchema.safeParse(values);
  if (!validValues.success) {
    return { error: "Values are not valid" };
  }
  const { email, password } = validValues.data;
  const existingUser = await getUserByEmail(email);
  console.log("existingUser ===", existingUser);
  if (!existingUser) {
    return { error: "Wrong password or email" };
  }
  const correctPassword = bcrypt.compareSync(password, existingUser.password);
  if (!correctPassword) {
    return { error: "Wrong password or email" };
  }
  // TODO: send validation to user mail
  await authLogin(email);
  return { success: "Email sent" };
};
