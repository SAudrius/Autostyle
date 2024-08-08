"use server";

import { jwtVerify } from "jose";

const getJwtSecretKey = async () => {
    const secret = process.env.JWT_SECRET_TOKEN;
    if ( !secret ) {
        console.error( "JWT secret token is missing or invalid." );
        throw new Error( "Environment variable is missing or invalid" );
    }

    const encoder = new TextEncoder();
    const secretKey = await encoder.encode( secret );

    return secretKey;
};


export const auth = async ( cookie: string | undefined ) => {
    const token = cookie;
    if ( !token ) {
        return false;
    }

    try {
        const secret = await getJwtSecretKey()
        const decoded = await jwtVerify(
            token,
            secret,
        );
        if ( !decoded || !decoded.payload.exp ) {
            throw new Error( "JWT token is not vaxxlid" );
        }
        if ( decoded.payload.exp > Math.floor( ( Date.now() / 1000 ) * 1000 * 60 ) ) {
            return false;
        }
    } catch ( err ) {
        return false;
    }
    return true;
};
