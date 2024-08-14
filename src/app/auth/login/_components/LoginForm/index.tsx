"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as z from "zod";

import { Socials } from "@/app/auth/_components";
import { 
    Button,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormLoading,
    FormMessage,
    Input,
} from "@/components";
import { 
    loginSchema, 
    storeLogin 
} from "@/lib";

import { login } from "../../_actions/login";

export const LoginForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [ error, setError ] = useState<string | undefined>( "" );
    const [ success, setSuccess ] = useState<string | undefined>( "" );
    const [ loading, setLoading ] = useState<boolean>( false );
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
        setLoading( true )
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
            setLoading( false )
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
                    {success && !loading && (
                        <p className=" mt-4 w-full rounded bg-emerald-300/50 px-4 py-2 text-center text-emerald-500">
                            {success}
                        </p>
                    )}
                    {error && !loading && (
                        <p className=" mt-4 w-full rounded bg-red-300/50 px-4 py-2 text-center text-red-500">
                            {error}
                        </p>
                    )}
                    {loading && !success && !error &&  ( <FormLoading className="mt-3" /> )}
                    <Button className="mt-4" type="submit" size="full">
                        Log in
                    </Button>
                </form>
            </Form>
        </div>
    );
};
