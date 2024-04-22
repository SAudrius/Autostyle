"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Socials } from "@/app/auth/_components";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  // eslint-disable-next-line no-unused-vars
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setError("");
    setSuccess("");
    console.log("values ===", values);
    startTransition(() => {
      const loginResponse = async () => {
        const loginActionResponse = await login(values);
        setError(loginActionResponse?.error);
        setSuccess(loginActionResponse?.success);
      };
      loginResponse();
    });
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-neutral-800">
                  Email
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-lg text-neutral-800">
                  Password
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>
                  <Link className="text-black" href="/auth/forgot-password">
                    Forgot password?
                  </Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Socials />
          {success && (
            <p className=" mt-4 w-full rounded bg-emerald-300/50 px-4 py-2 text-center text-emerald-500">
              {success}
            </p>
          )}
          {error && (
            <p className=" mt-4 w-full rounded bg-red-300/50 px-4 py-2 text-center text-red-500">
              {error}
            </p>
          )}
          <Button className="mt-4" type="submit" size="full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
