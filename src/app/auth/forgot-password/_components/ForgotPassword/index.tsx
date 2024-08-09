/* eslint-disable no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button,     Form,
    FormControl,
    FormError,     FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormSuccess, Input,
} from "@/components";
import { forgotPasswordSchema } from "@/lib";

import { forgotPassword } from "../../actions/forgotPassword";

export const ForgotPasswordForm = () => {
    // const [isPending, startTransition] = useTransition();
    const [ success, setSuccess ] = useState<string | undefined>( "" );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ error, setError ] = useState<string | undefined>( "" );

    const form = useForm<z.infer<typeof forgotPasswordSchema>>( {
        resolver: zodResolver( forgotPasswordSchema ),
        defaultValues: {
            email: "",
        },
    } );

    const onSubmit = ( values: z.infer<typeof forgotPasswordSchema> ) => {
        setError( "" );
        setSuccess( "" );
        // startTransition(() => {
        const forgotPasswordResponse = async () => {
            const forgotPasswordActionResponse = await forgotPassword( values.email );
            setError( forgotPasswordActionResponse?.error );
            setSuccess( forgotPasswordActionResponse?.success );
        };
        forgotPasswordResponse();
    // });
    };
    // TODO: validate token on load if token does not exist display it Error if exist can change password
    return (
        <Form {...form}>
            {!error && !success && (
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
