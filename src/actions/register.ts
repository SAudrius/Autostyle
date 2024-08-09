"use server";
import { createUserByData, getUserByEmail } from "@lib/data/users";
import { registerSchema } from "@lib/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

import { generateVerificationToken } from "@/lib/auth/tokens";
import { sendEmail } from "@/lib/mail/sendMail";

export const register = async ( values: z.infer<typeof registerSchema> ) => {
    const validValues = registerSchema.safeParse( values );
    if ( !validValues.success ) {
        return { error: "Fields are not valid" };
    }
    const { email, first_name, last_name, password, repeat_password } =
    validValues.data;

    if ( password !== repeat_password ) {
        return { error: "Password & repeat password do not match" };
    }
    const existingUser = await getUserByEmail( email );
    // eslint-disable-next-line no-extra-boolean-cast
    if ( existingUser ) {
        return { error: "This email has already in use" };
    }
    try {
        const newToken = await generateVerificationToken( email, 'email' );

        if ( !newToken ) {
            return { error: 'Something went wrong' }
        }

        const buttonHref = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/verification?token=${newToken}`
  
        const responseBoolean = await sendEmail( email, 'd-d97ea36e69a242c1a84f2da9e4f68b90', { "button_href": buttonHref } );
        if ( !responseBoolean ) {
            return { error: 'Something went wrong' }
        }

        const hashedPassword = await bcrypt.hash( password, 10 );

        const newUser = await createUserByData(
            first_name,
            last_name,
            email,
            hashedPassword,
        );
        if ( !newUser ) {
            return { error: "Someting went wrong" };
        }
        if ( newUser?.affectedRows !== 1 ) return { success: "Something went wrong" };
  
    } catch {
        return { error: 'Something went wrong' }
    }
    return { success: "Check your email for a confirmation" };
};
