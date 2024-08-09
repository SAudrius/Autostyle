'use server'
import bcrypt from "bcryptjs";
import * as z from "zod";

import { 
    deleteVerificationTokenById, 
    getUserByEmail, 
    getVerificationTokenByToken, 
    resetPasswordSchema, 
    sendEmail, 
    updateUserEmailVerifiedById, 
    updateUserPasswordById 
} from "@/lib";

export const passwordValidate = async ( values: z.infer<typeof resetPasswordSchema>, token:string ) => {
    const currentTime = new Date() 

    const validValues = resetPasswordSchema.safeParse( values );
    if ( !validValues.success ) {
        return { error: "Values are not valid" };
    }

    const verifyTokenData = await getVerificationTokenByToken( token )
    if ( !verifyTokenData?.email ) {
        return  { error: 'Token is not valid' }
    }

    const verifyTokenExpires = new Date( verifyTokenData.expires ).getTime();

    const expiredTime = new Date( currentTime.getTime() + ( 30 * 60000 ) )
    if ( verifyTokenExpires > expiredTime.getTime() ) {
        return { error: 'Token is expired' }
    }

    const userData = await getUserByEmail( verifyTokenData.email )
    if ( !userData ) {
        return { error: 'Something went wrong' }
    }

    const hashedPassword = await bcrypt.hash( values.password, 10 );

    const rows = await updateUserPasswordById( hashedPassword, userData.id )
    if ( rows?.affectedRows !== 1 ) {
        return { error: 'Something went wrong' }
    }

    const updatedUserEmailRows = await updateUserEmailVerifiedById( userData.id )
    if ( updatedUserEmailRows?.affectedRows !== 1 ) {
        return { error: 'Something went wrong' }
    }  
  
    const responseBoolean = await sendEmail( verifyTokenData.email, 'd-45b8ff23a204431c938f1e3d1fe7dee5' );
    if ( !responseBoolean ) {
        return { error: 'Something went wrong' }
    }

    const deletedTokenRows = await deleteVerificationTokenById( verifyTokenData.id )
    if ( deletedTokenRows?.affectedRows !== 1 ) {
        return { error: 'Something went wrong' }
    }  

    return { success: 'Success! redirecting..' }
}