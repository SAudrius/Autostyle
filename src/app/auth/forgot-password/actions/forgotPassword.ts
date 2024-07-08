'use server'

import { generateVerificationToken } from "@/lib/auth/tokens";
import { getUserByEmail } from "@/lib/data/users";
import { sendMailToken } from "@/lib/mail/mail";

export const forgotPassword = async ( email: string ) => {

    if ( !email ) {
        return { error: 'Something went wrong' }
    }

    const existingUser = await getUserByEmail( email )
    if ( !existingUser?.email ) {
        return { error: 'Email does not exist' }
    }
    if ( !existingUser?.email_verified ) {
        return { error: 'Please verify email first' }
    }

    const newToken = await generateVerificationToken( existingUser.email, 'password' );
    if ( !newToken ) {
        return { error: 'Something went wrong' }
    }

    const { mailError } = await sendMailToken( newToken, email, "forgotPassword" )
    if ( mailError ) {
        return { error: 'Something went wrong' }
    }

    return { success: 'Success! Check your email for instructions' }

}