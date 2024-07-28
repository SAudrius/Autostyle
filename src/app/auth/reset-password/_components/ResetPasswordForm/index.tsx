"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { resetPasswordSchema } from "@/lib/schemas";

import { passwordValidate } from "../../actions/passwordValidate";

export const ResetPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get( "token" );
    const [ error, setError ] = useState<string | undefined>( "" );
    const [ tokenError, setTokenError ] = useState<string | undefined>( "" );
    const [ success, setSuccess ] = useState<string | undefined>( "" );
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [ isPending, startTransition ] = useTransition();
    const form = useForm<z.infer<typeof resetPasswordSchema>>( {
        resolver: zodResolver( resetPasswordSchema ),
        defaultValues: {
            password: "",
            repeat_password: "",
        },
    } );

    const onPageLoad = useCallback( () => {
        if ( !token ) {
            setTokenError( "Mising token go to " );
            return;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ token ] );

    useEffect( () => {
        onPageLoad();
    }, [ onPageLoad ] );

    function onSubmit( values: z.infer<typeof resetPasswordSchema> ) {
        if ( !token ) {
            setTokenError( "Mising token go to " );
            return;
        }
        setError( "" );
        setSuccess( "" );
        startTransition( () => {
            const resetPasswordResponse = async () => {
                const resetPasswordActionResponse = await passwordValidate(
                    values,
                    token,
                );
                setError( resetPasswordActionResponse?.error );
                setSuccess( resetPasswordActionResponse?.success );
                if ( resetPasswordActionResponse?.success ) {
                    router.push( "auth/login" );
                }
            };
            resetPasswordResponse();
        } );
    }
    return (
        <div className="">
            {!tokenError && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit( onSubmit )}>
                        <FormField
                            control={form.control}
                            name="password"
                            render={( { field } ) => (
                                <FormItem className="mt-4">
                                    <FormLabel className="text-lg text-neutral-800">
                                      Password
                                    </FormLabel>
                                    <FormMessage />
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="repeat_password"
                            render={( { field } ) => (
                                <FormItem className="mt-4">
                                    <FormLabel className="text-lg text-neutral-800">
                                      Repeat Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>
                                      Password must contain at least one uppercase letter, one
                                      lowercase letter, one digit, and one special character
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
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
            )}
            {tokenError && (
                <p className=" w-full rounded bg-red-300/50 px-4 py-2 text-center text-red-500">
                    {tokenError}
                    <Link className="mt-1 underline " href="/auth/forgot-password">
                      forgot password
                    </Link>
                </p>
            )}
        </div>
    );
};
