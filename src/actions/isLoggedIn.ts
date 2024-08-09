"use server";

import { cookies } from "next/headers";

import { auth } from "@/lib"

export const isUserLoggedIn = async () => {
    const authCookie = cookies().get( "auth" );
    if ( !authCookie ) {
        return false;
    }

    const isLoggedIn = await auth( authCookie?.value );
    return isLoggedIn;
};
