"use server";
import { cookies } from "next/headers";

import { tokenDataByToken } from "@/lib/auth/auth";
import { getUserDetailsById } from "@/lib/data/users";

export const userInfo = async () => {
  const userToken = cookies().get("auth")?.value;
  if (!userToken) {
    return;
  }
  const jwtData = await tokenDataByToken(userToken);
  if (!jwtData) {
    return;
  }
  const userData = await getUserDetailsById(jwtData.userId);
  if (!userData?.email) {
    return;
  }

  const userDataApi: UserDetails = {
    firstName: userData.first_name,
    lastName: userData.last_name,
    email: userData.email,
    country: userData.country,
    city: userData.city,
    address: userData.address,
  };
  return userDataApi;
};
