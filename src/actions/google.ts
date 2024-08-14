"use server";
import { google } from "googleapis";
import { redirect } from "next/navigation";

import { 
    createGoogleUserByData,
    getUserByEmail, 
    sendEmail
} from "@/lib";
import { authLogin } from "@/lib/auth/auth";

authLogin

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_API_CLIENT_ID,
    process.env.GOOGLE_API_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL,
);

export const authGoogle = () => {
    const scopes = [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ];

    const authorizationUrl = oauth2Client.generateAuthUrl( {
        access_type: "online",
        // TODO: offline for refresh token to not require authorization again
        scope: scopes,
        include_granted_scopes: true,
    } );

    redirect( authorizationUrl );
};

export const fetchGoogleCode = async ( code: string ) => {
    if ( !code ) {
        return { error: "Not a valid code" };
    }
    try {
        const encodedString = encodeURIComponent( code );
        const serverGoogleUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google?code=${encodedString}`;
        const result = await fetch( serverGoogleUrl );
        if ( !result.ok ) {
            return { error: "Somethink went wrong with google services" };
        }
        const data = await result.json();
        const userExist = await getUserByEmail( data.email );
        if ( userExist ) {
            await authLogin( userExist.email );
        } else {
            // Creating user and account
            const resultHeaderResponse = await createGoogleUserByData(
                data.first_name,
                data.last_name,
                data.email,
                data.image,
            );
            if ( !resultHeaderResponse ) {
                return { error: "Somethink went wrong" };
            }

            const responseBoolean = await sendEmail( data.email, 'd-f6e1abd0be7e4fc090a035c3e63b6751' );
            if ( !responseBoolean ) {
                return { error: 'Something went wrong' }
            }

            // Creating cookies
            await authLogin( data.email );
            return { success: "Redirecting..." };
        }
    } catch ( err ) {
        return { error: "Somethink wrong with server" };
    }
};
