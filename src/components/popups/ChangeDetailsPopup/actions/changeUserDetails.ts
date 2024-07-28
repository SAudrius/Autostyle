'use server'

import { getUserById, updateUserDetailsById } from "@lib/data/users";
import { detailsSchema } from "@lib/schemas";
import { cookies } from "next/headers";
import * as z from "zod";

import { tokenDataByToken } from "@/lib/auth/auth";

export const changeUserDetails = async ( values: z.infer<typeof detailsSchema> ) => {
    const validValues = detailsSchema.safeParse( values );
    if ( !validValues.success ) {
        return { error: "Values are not valid" };
    }

    const { first_name, last_name, country, city, address } = validValues.data;

    const authCookie = cookies().get( 'auth' );
    if ( !authCookie ) {
        return { error: 'Something went wrong' };
    }

    const jwtTokenData = await tokenDataByToken( authCookie.value );
    if ( !jwtTokenData ) {
        return { error: 'Something went wrong' };
    }

    const userId = parseInt( jwtTokenData?.userId );
    
    const userData = await getUserById( userId );
    if ( !userData ) {
        return { error: 'Something went wrong' };
    }

    if (
        userData.first_name === first_name &&
        userData.last_name === last_name &&
        userData.country === country &&
        userData.city === city &&
        userData.address === address
    ) {
        return { success: 'Success!' };
    }

    const updateDetailsRows = await updateUserDetailsById( userId, first_name, last_name, country, city, address )
    if ( updateDetailsRows?.affectedRows !== 1 ) {
        return { error: 'Something went wrong' };
    } 
    return { success: 'Success!' };
}