'use server'
import { tokenDataByToken } from "@lib/auth/auth";
import { getUserWithPasswordById, updateUserPasswordById } from "@lib/data/users";
import { deleteVerificationCodesByUserId, getCountVerificationCodesByUserId } from "@lib/data/verificationCodes";
import { resetPasswordSchema } from "@lib/schemas";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers"
import * as z from "zod";

import { sendMail } from "@/lib/mail/mail";


export const changePassword = async ( values: z.infer<typeof resetPasswordSchema> ) => {

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

    const userData = await getUserWithPasswordById( userId )

    if( !userData ) {
        return { error: 'Something went wrong 1' }
    }

    const hashedPassword = await bcrypt.hash( validValues.data.password, 10 );

    if ( hashedPassword !== userData.password ){

        const rows = await updateUserPasswordById( hashedPassword, userId )
        if ( rows?.affectedRows !== 1 ) {
            return { error: 'Something went wrong' }
        }
    }

    const tokenCount = await getCountVerificationCodesByUserId( userId, 'password' )
    if ( tokenCount ){ 

        const deletedTokenRows = await deleteVerificationCodesByUserId( userData.id, 'password' )
        if ( deletedTokenRows?.affectedRows !== 1 ) {
            return { error: 'Something went wrong 2' }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mailError } = await sendMail( userData.email, 'successPassword' )
    if ( mailError ) {
        return { error: 'Something went wrong 3' }
    }

    return { success: 'Password changed' }
}