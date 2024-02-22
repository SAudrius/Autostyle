"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// import { newPassword } from "@/actions/new-password";
// import { validPasswordToken } from "@/actions/valid-password-token";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/custom/FormError";
import { FormSuccess } from "@/components/ui/custom/FormSuccess";
import { LoadingPulse } from "@/components/ui/custom/LoadingPulse";
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
import { newPasswordSchema } from "@/schemas";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loader, setLoader] = useState<boolean>(true);
  const [success, setSuccess] = useState<string | undefined>("");
  const [mainError, setMainError] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    console.log("values ===", values);
  };

  const onLoad = useCallback(() => {
    if (!token) {
      setMainError("Token does not exist");
      return;
    }
    setLoader(false);
  }, [token]);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  console.log("mainError ===", mainError);
  if (mainError) {
    return <FormError message={mainError} />;
  }

  if (loader) {
    return <LoadingPulse />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Must contain at least one uppercase letter, one lowercase
                letter, one digit, and one special character
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4 " type="submit" size="full">
          Submit
        </Button>
      </form>
      {success && <FormSuccess className="mt-4" message={success} />}
      {error && <FormError className="mt-4" message={error} />}
    </Form>
  );
};
