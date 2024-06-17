import React from "react";

import { UserInfoField } from "@/app/(protected)/account/_components/Ui/UserInfoField";
import { Line } from "@/components/ui/custom/Line";
import { SubLineHeading } from "@/components/ui/custom/SubLineHeading";

import { userInfo } from "./actions/userInfo";

export const AccountInfo = async () => {
  const userData = await userInfo();
  if (!userData) {
    // TODO: logout or display message
    return;
  }
  return (
    <>
      <SubLineHeading logoutButton className="mt-8">
        <h2 className="text-lg uppercase tracking-wide-20 drop-shadow-text">
          Account
        </h2>
      </SubLineHeading>
      <UserInfoField
        className="mt-6"
        field="Name"
        value={userData.firstName || "Not provided"}
      />
      <UserInfoField
        className="mt-3"
        field="Last name"
        value={userData.lastName || "Not provided"}
      />
      <UserInfoField
        className="mt-3"
        field="country"
        value={userData.country || "Not provided"}
      />
      <UserInfoField
        className="mt-3"
        field="city"
        value={userData.city || "Not provided"}
      />
      <UserInfoField
        className="mt-3"
        field="Address"
        value={userData.address || "Not provided"}
        infoValues={"values"}
      />
      <Line className="mb-4 mt-4" />
      <UserInfoField
        className="mt-3"
        field="Email"
        value={userData.email || "Not provided"}
        linkLabel="Change email"
        linkHref="/change-email"
      />
      <Line className="mb-4 mt-4" />
      <UserInfoField
        className="mt-3"
        field="Password"
        value="********"
        linkLabel="Change password"
        linkHref="/password"
      />
    </>
  );
};
