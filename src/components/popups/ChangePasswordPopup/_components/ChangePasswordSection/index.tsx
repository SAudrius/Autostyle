/* eslint-disable no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
    FormSuccess,
    Input } 
    from "@/components";
import { cn, nunito  } from "@/config";
import { resetPasswordSchema } from "@/lib";

import { changePassword } from "../../actions/changePassword";

interface ChangePasswordSectionProps {
    handleClose: () => void;
}

export const ChangePasswordSection = ( { handleClose }: ChangePasswordSectionProps ) => {
    const [ success, setSuccess ] = useState<string | undefined>( "" );
    const [ error, setError ] = useState<string | undefined>( "" );
    const [ loading, setLoading ] = useState( false );

    const form = useForm<z.infer<typeof resetPasswordSchema>>( {
        resolver: zodResolver( resetPasswordSchema ),
        defaultValues: {
            password: "",
            repeat_password: "",
        },
    } );

    const onSubmit = ( values: z.infer<typeof resetPasswordSchema> ) => {
        setLoading( true )
        setError( "" );
        setSuccess( "" );
        const changePasswordResponse = async () => {
            const changePasswordActionResponse = await changePassword( values );
            setError( changePasswordActionResponse?.error ); 
            setSuccess( changePasswordActionResponse?.success );
            setLoading( false )
        };
        changePasswordResponse();
    }
    return ( <>
        <h3 className="nunit text-center text-xl tracking-wide-12">
            Procced password change
        </h3>
        <p className={cn( "mt-4 text-center", nunito.className )}>
            You will receive a verification code via email to change password
        </p>
        <Form {...form}>
            <form onSubmit={form.handleSubmit( onSubmit )}>
                <FormField
                    control={form.control}
                    name="password"
                    render={( { field } ) => (
                        <FormItem className="mt-2">
                            <FormLabel className="text-lg font-thin text-neutral-800">
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="repeat_password"
                    render={( { field } ) => (
                        <FormItem className="mt-4">
                            <FormLabel className="text-lg font-thin text-neutral-800">
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
                {loading && <FormLoading />}
                {success && (
                    <FormSuccess className="mt-2" size="small" message={success} />
                )}
                {error && (
                    <p className="mt-4 w-full rounded h-[36px] bg-red-300/50 px-4 pt-2 pb-[9px] text-base text-center text-red-500">
                        {error}
                    </p>
                )}
                {success && !error && !loading && <Button className="mt-4 " type="button" size="full" variant="outline" onClick={handleClose}>Done!</Button>}
                {!success && <Button className="mt-4" type="submit" size="full">
                    Change Password
                </Button>}
            </form>
        </Form>
    </>
    );
};
