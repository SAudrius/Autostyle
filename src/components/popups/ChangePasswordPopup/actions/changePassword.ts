'use server'
import { tokenDataByToken } from "@lib/auth/auth";
import { getUserById, updateUserPasswordById } from "@lib/data/users";
import { resetPasswordSchema } from "@lib/schemas";
import { cookies } from "next/headers"
import * as z from "zod";

import { sendMail } from "@/lib/mail/mail";


export const changePassword = async ( values: z.infer<typeof resetPasswordSchema> ) => {
    console.log( 'change password' );

    const authCookie = cookies().get( 'auth' )
    
    if ( !authCookie ) {
        console.log( 'log out' )
        return
    }
    
    const jwtTokenData = await tokenDataByToken( authCookie.value )
    if ( !jwtTokenData ) {
        console.log( 'something went wrong' )
        return 
    }

    const userId = parseInt( jwtTokenData?.userId )

    const validValues = resetPasswordSchema.safeParse( values );

    if ( !validValues.success ) {
        return { error: "Fields are not valid" };
    }

    const rows = await updateUserPasswordById( validValues.data?.password, userId )
    if ( rows?.affectedRows !== 1 ) {
        console.log( 'wrong db update password' );
        return
    }

    const userData = await getUserById( userId )

    if( !userData ) {
        return { error: 'Something went wrong' }
    }

    console.log( 'values ===', values );
    console.log( 'validValues ===', validValues );
    const { mailError } = await sendMail( userData.email, 'successPassword' )

    if ( mailError ) {
        return { error: 'Something went wrong' }
    }
    
    return { success: 'Password changed' }
}