/* eslint-disable no-unused-vars */
"use client";

// import { forgotPassword } from "@/actions/forgot-password";
import { Button } from "@components/ui/button";
import { FormError, FormSuccess } from "@components/ui/custom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@lib/schemas";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const ForgotPasswordForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loader, setLoader] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [success, setSuccess] = useState<string | undefined>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
