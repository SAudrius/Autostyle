/* eslint-disable no-unused-vars */
"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { nunito } from "@config/fonts";
import { cn } from "@config/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeEmailSchema } from "@lib/schemas";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/custom";
import { FormLoading } from "@/components/ui/custom/FormLoading";


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
