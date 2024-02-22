import * as z from "zod";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const registerSchema = z
  .object({
    first_name: z
      .string()
      .min(1, { message: "First name is required" })
      .min(2, { message: "First Name must be at least 2 letters" }),
    last_name: z
      .string()
      .min(1, { message: "Last name is required" })
      .min(2, { message: "Last Name must be at least 2 letters" }),
    email: z.string().email({ message: "Must be valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must have at least 8 letters" })
      .regex(passwordRegex, "Password must meet the requirements"),
    repeat_password: z
      .string()
      .min(1, { message: "Repeat Password is required" }),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Passwords do not match",
    path: ["repeat_password"],
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
});

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 letters" })
    .regex(passwordRegex, "Password must meet the requirements"),
});
