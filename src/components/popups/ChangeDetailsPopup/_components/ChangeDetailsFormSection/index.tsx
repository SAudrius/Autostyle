import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropagateLoader from "react-spinners/PropagateLoader";
import * as z from "zod";

import { userInfo } from "@/app/(protected)/account/_components/AccountInfo/actions/userInfo";
import { 
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@/components";
import { detailsSchema } from "@/lib";

import { changeUserDetails } from "../../actions/changeUserDetails";


interface ChangeDetailsFormSectionProps {
    setChangeDetailsSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

export const ChangeDetailsFormSection = ( { setChangeDetailsSuccess }:ChangeDetailsFormSectionProps ) => {
    const [ error, setError ] = useState<string | undefined>( "" );
    const [ loading, setLoading ] = useState( false )
    const [ success, setSuccess ] = useState<string | undefined>( "" );
    
    const form = useForm<z.infer<typeof detailsSchema>>( {
        resolver: zodResolver( detailsSchema ),
        defaultValues: {
            first_name: "",
            last_name:"",
            country:  "",
            city:  "",
            address: "", }
    } );

    const { reset } = form;

    const fetchUserDetails = () => {
        const userDataResponse = async () => {
            const userDataActionResponse = await userInfo();
            if ( userDataActionResponse?.data ) {
                reset( userDataActionResponse.data );
                return
            }
            setError( userDataActionResponse.error )
        };
        setLoading( false )
        userDataResponse();
    }



    function onSubmit( values: z.infer<typeof detailsSchema> ) {
        setError( "" );
        setSuccess( "" );
        setLoading( true )
        const changeDetailsResonse = async () => {
            const changeDetailsActionResponse = await changeUserDetails( values );
            if ( changeDetailsActionResponse?.success ) {
                setChangeDetailsSuccess( true )
            } else {
                setError( changeDetailsActionResponse?.error )
            }
            setLoading( false )
        };
        changeDetailsResonse();
    }

    useEffect( () => {
        fetchUserDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    return (
        <>
            <h3 className={"text-center text-xl tracking-wide-12"}>
                Your details
            </h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit( onSubmit )}>
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={( { field } ) => (
                            <FormItem className="mt-4">
                                <FormLabel className="text-base font-normal text-neutral-900">
                                    First Name
                                </FormLabel>
                                <FormControl>
                                    <Input className="mt-0 h-[36px]" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={( { field } ) => (
                            <FormItem className="mt-4">
                                <FormLabel className="text-base font-normal text-neutral-900">
                                    Last Name
                                </FormLabel>
                                <FormControl>
                                    <Input className="h-[36px]" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={( { field } ) => (
                            <FormItem className="mt-4">
                                <FormLabel className="text-base font-normal text-neutral-900">
                                    Country
                                </FormLabel>
                                <FormControl>
                                    <Input className="h-[36px]" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={( { field } ) => (
                            <FormItem className="mt-4">
                                <FormLabel className="text-base font-normal text-neutral-900">
                                    City
                                </FormLabel>
                                <FormControl>
                                    <Input className="h-[36px]" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={( { field } ) => (
                            <FormItem className="mt-4">
                                <FormLabel className="text-base font-normal text-neutral-900">
                                    Address
                                </FormLabel>
                                <FormControl>
                                    <Input className="h-[36px]" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {loading && !error &&  !success && (
                        <p className="mt-4 w-full rounded bg-transparent px-4 py-2 flex justify-center items-center">
                            <PropagateLoader />
                        </p>
                    )}
                    {success && !loading  &&(
                        <p className="mt-4 w-full rounded bg-emerald-300/50 px-4 py-2 text-center text-emerald-500">
                            {success}
                        </p>
                    )}
                    {error && !loading && (
                        <p className="mt-4 w-full rounded bg-red-300/50 px-4 py-2 text-center text-red-500">
                            {error}
                        </p>
                    )}
                    <Button className="mt-6" type="submit" size="full" >
                        Change Details
                    </Button>
                </form>
            </Form>
        </>
    )
}
