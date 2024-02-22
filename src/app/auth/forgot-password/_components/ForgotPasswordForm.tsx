"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// import { forgotPassword } from "@/actions/forgot-password";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/custom/FormError";
import { FormSuccess } from "@/components/ui/custom/FormSuccess";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/schemas";

export const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [loader, setLoader] = useState<boolean>(true);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = () => {
    console.log("submit");
  };
  //   TODO: validate token on load if token does not exist display it Error if exist can change password
  return (
    <Form {...form}>
      {!error && (
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mb-4 mt-4" type="submit" size="full">
            Submit
          </Button>
        </form>
      )}
      {success && <FormSuccess message={success} />}
      {error && <FormError message={error} />}
    </Form>
  );
};
