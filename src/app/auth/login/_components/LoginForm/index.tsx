"use client";

import { Button } from "@components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@lib/schemas";
import { storeLogin } from "@lib/store/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as z from "zod";

import { login } from "@/actions/login";
import { Socials } from "@/app/auth/_components";

export const LoginForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [ error, setError ] = useState<string | undefined>( "" );
    const [ success, setSuccess ] = useState<string | undefined>( "" );
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [ isPending, startTransition ] = useTransition();
    const form = useForm<z.infer<typeof loginSchema>>( {
        resolver: zodResolver( loginSchema ),
        defaultValues: {
            email: "",
            password: "",
        },
    } );

    function onSubmit( values: z.infer<typeof loginSchema> ) {
        setError( "" );
        setSuccess( "" );
        startTransition( () => {
            const loginResponse = async () => {
                const loginActionResponse = await login( values );
                setError( loginActionResponse?.error );
                setSuccess( loginActionResponse?.success );
                if ( loginActionResponse?.success ) {
                    dispatch( storeLogin() );
                    router.push( "/account" );
                }
            };
            loginResponse();
        } );
    }
    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit( onSubmit )}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={( { field } ) => (
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
                        render={( { field } ) => (
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
            Log in
                    </Button>
                </form>
            </Form>
        </div>
    );
};
