'use server'

import { generateVerificationToken } from "@lib/auth/tokens";
import { getUserByEmail } from "@lib/data/users";
import { sendEmail } from "@lib/mail/sendMail";

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

    const buttonHref = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?token=${newToken}`
  
    const responseBoolean = await sendEmail( email, 'd-676ca8d5a82a4639877b942a1aa20d26', { "button_href": buttonHref } );
    if ( !responseBoolean ) {
        return { error: 'Something went wrong' }
    }

    return { success: 'Success! Check your email for instructions' }

}