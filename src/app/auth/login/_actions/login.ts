"use server";
import bcrypt from "bcryptjs";
import * as z from "zod";

import { authLogin,
    deleteVerificationTokenByEmail,
    generateVerificationToken, 
    getUserByEmail, 
    getVerificationTokenByEmail, 
    loginSchema, 
    sendEmail 
} from "@/lib";

export const login = async ( values: z.infer<typeof loginSchema> ) => {
    const validValues = loginSchema.safeParse( values );
    if ( !validValues.success ) {
        return { error: "Values are not valid" };
    }
    const { email, password } = validValues.data;

    const existingUser = await getUserByEmail( email );

    if ( !existingUser ) {
        return { error: "Wrong password or email" };
    }

    const correctPassword = bcrypt.compareSync( password, existingUser.password );
    if ( !correctPassword ) { 
        return { error: "Wrong password or email" };
    }

    if ( !existingUser.email_verified ) {

        const oldToken = await getVerificationTokenByEmail( existingUser.email, 'email' )
        console.log( 'oldToken?.email', oldToken?.email )
        if ( oldToken?.email ) {
            const deletedResponse = await deleteVerificationTokenByEmail( existingUser.email, 'email' )
            if ( deletedResponse?.affectedRows !== 1 ) {
                return { error: 'Something went wrong' };
            }
        }

        const newToken = await generateVerificationToken( existingUser.email, 'email' );
        if ( !newToken ) {
            return { error: 'Something went wrong' }
        }

        const buttonHref = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/verification?token=${newToken}`
  
        const responseBoolean = await sendEmail( email, 'd-d97ea36e69a242c1a84f2da9e4f68b90', { "button_href": buttonHref } );
        if ( !responseBoolean ) {
            return { error: 'Something went wrong' }
        }

        return { error: 'Email is not verified. Check your email' }
    }
  
    await authLogin( email );
    return { success: "Login success!" };
};
