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
import { registerSchema } from "@lib/schemas";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Socials } from "@/app/auth/_components";
import { FormLoading } from "@/components/ui/custom/FormLoading";

import { register } from "../../_actions/register";

export const RegisterForm = () => {
    const [ success, setSuccess ] = useState<string | undefined>( "" );
    const [ error, setError ] = useState<string | undefined>( "" );
    const [ loading, setLoading ] = useState<boolean>( false );
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [ isPending, startTransition ] = useTransition();

    const form = useForm<z.infer<typeof registerSchema>>( {
        resolver: zodResolver( registerSchema ),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            repeat_password: "",
        },
    } );

    function onSubmit( values: z.infer<typeof registerSchema> ) {
        setError( "" );
        setSuccess( "" );
        setLoading( true );
        startTransition( () => {
            const registerResponse = async () => {
                const registerActionResponse = await register( values );
                setError( registerActionResponse?.error );
                setSuccess( registerActionResponse?.success );
            };
            registerResponse();
            setLoading( false );
        } );
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit( onSubmit )}>
                <FormField
                    control={form.control}
                    name="first_name"
                    render={( { field } ) => (
                        <FormItem className="mt-4">
                            <FormLabel className="text-lg text-neutral-800">
                                First Name
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="last_name"
                    render={( { field } ) => (
                        <FormItem className="mt-4">
                            <FormLabel className="text-lg text-neutral-800">
                                Last Name
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={( { field } ) => (
                        <FormItem className="mt-4">
                            <FormLabel className="text-lg text-neutral-800">Email</FormLabel>
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
                            <FormMessage />
                            <FormDescription>
                                Must contain at least one uppercase letter, one lowercase
                                letter, one digit, and one special character
                            </FormDescription>
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

                {loading && <FormLoading className="mt-3" />}
                <Button className="mt-4" type="submit" size="full">
                    Register
                </Button>
            </form>
        </Form>
    );
};
