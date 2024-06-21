"use server";
import { authLogin } from "@lib/auth/auth";
import { getUserByEmail } from "@lib/data/users";
import { loginSchema } from "@lib/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

import { generateVerificationToken } from "@/lib/auth/tokens";
import { sendMail } from "@/lib/mail/mail";

export const login = async (values: z.infer<typeof loginSchema>) => {
  
  const validValues = loginSchema.safeParse(values);
  if (!validValues.success) {
    return { error: "Values are not valid" };
  }
  const { email, password } = validValues.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Wrong password or email" };
  }

  const correctPassword = bcrypt.compareSync(password, existingUser.password);
  if (!correctPassword) {
    return { error: "Wrong password or email" };
  }

  if (!existingUser.email_verified) {

    const newToken = await generateVerificationToken(existingUser.email);
    if (!newToken) {
      return {error: 'Something went wrong'}
    }

    const {mailError} = await sendMail(newToken,email,'verification');
    if (mailError) {
      return {error: 'Something went wrong'}
    }

    return {error: 'Email is not verified. Check your email'}
  }
  
  await authLogin(email);
  return { success: "Login success" };
};
