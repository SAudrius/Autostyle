"use server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

import { getUserByEmail } from "@/lib";

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

export const authLogin = async ( email: string ) => {
    const secretKey = await getJwtSecretKey()
    const user = await getUserByEmail( email );
    if ( !user ) {
        return;
    }
    const authToken = await new SignJWT( {
        userId: user.id,
        iat: Date.now(),
        exp: Math.floor( Date.now() / 1000 ) + 60 * 60,
    } )
        .setProtectedHeader( { alg: "HS256" } ) // Specify the algorithm
        .setIssuedAt() // Set the issued-at time
        .sign( secretKey );
    cookies().set( "auth", authToken );
};
 
export const tokenDataByToken = async ( token: string ) => {
    const secret = await getJwtSecretKey();

    try {
        const { payload } = await jwtVerify<JwtData>( token, secret );
        return payload;
    } catch ( err ) {
        return;
    }
};


export const authLogout = async () => {
    cookies().delete( "auth" );
};
