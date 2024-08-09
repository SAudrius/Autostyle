/* eslint-disable no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { 
    Button,
    Form,
    FormControl,
    FormError,
    FormField,
    FormItem,
    FormLabel,
    FormLoading,
    FormMessage,
    Input 
} from "@/components";
import { cn, nunito  } from "@/config";
import { changeEmailSchema } from "@/lib";


// import { changeEmail } from "../../actions/changeEmail";


interface ChangePasswordSectionProps {
    handleSubmit: ( values: { email: string; } ) => void;
    error: string
    loading: boolean
}

export const ChangeEmailSection = ( {  handleSubmit, error, loading }: ChangePasswordSectionProps ) => {

    const form = useForm<z.infer<typeof changeEmailSchema>>( {
        resolver: zodResolver( changeEmailSchema ),
        defaultValues: {
            email: ''
        },
    } );

    return ( <>
        <h3 className="nunit text-center text-xl tracking-wide-12">
            Procced Email change
        </h3>
        <p className={cn( "mt-4 text-center max-w-[350px] mx-auto", nunito.className )}>
            Please enter your new email address to receive a verification code.
        </p>
        <Form {...form}>
            <form onSubmit={form.handleSubmit( handleSubmit )}>
                <FormField
                    control={form.control}
                    name="email"
                    render={( { field } ) => (
                        <FormItem className="mt-2">
                            <FormLabel className="text-lg font-thin text-neutral-800">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {loading && <FormLoading className="" />}
                {error && (
                    <FormError className="mt-4" size="small" message={error} />
                )}
                <Button className="mt-4" type="submit" size="full">
                    Confirm
                </Button>
            </form>
        </Form>
    </>
    );
};
