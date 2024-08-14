'use server'
import bcrypt from "bcryptjs";
import { cookies } from "next/headers"
import * as z from "zod";

import { checkUserEmailLimit } from "@/config";
import { deleteVerificationCodesByUserId, 
    getCountVerificationCodesByUserId, 
    getUserWithPasswordById, 
    resetPasswordSchema, 
    sendEmail,    tokenDataByToken, 
    updateUserPasswordById  }
    from "@/lib";

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

    if ( values.password !== values.repeat_password ) {
        return { error: "Password and repeat password do not match" };
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

    const { error: expiredError } = await checkUserEmailLimit( userData )
    if ( expiredError ) {
        return { error:expiredError }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const responseBoolean = await sendEmail( userData.email, 'd-45b8ff23a204431c938f1e3d1fe7dee5' );
    if ( !responseBoolean ) {
        return { error: 'Something went wrong' } 
    }

    return { success: 'Password changed' }
}