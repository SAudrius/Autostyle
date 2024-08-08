"use server";
import { tokenDataByToken } from "@lib/auth/auth";
import { getUserDetailsById } from "@lib/data/users";
import { cookies } from "next/headers";

export const userInfo = async () => {
    const userToken = cookies().get( "auth" )?.value;
    if ( !userToken ) {
        return { error: 'Something went wrong' };

    }
    const jwtData = await tokenDataByToken( userToken );
    if ( !jwtData ) {
        return { error: 'Something went wrong' };
    }
    const userData = await getUserDetailsById( jwtData.userId );
    if ( !userData?.email ) {
        return { error: 'Something went wrong' };
    }

    const userDataObj: UserDetailsApi = {
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        country: userData.country || "",
        city: userData.city || "",
        address: userData.address || "",
    };
    return { data: userDataObj }
};
