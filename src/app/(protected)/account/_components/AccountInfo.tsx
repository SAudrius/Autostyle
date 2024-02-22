import React from "react";

import { Line } from "@/components/ui/custom/Line";
import { SubLineHeading } from "@/components/ui/custom/SubLineHeading";

import { UserInfoField } from "./ui/UserInfoField";

export const AccountInfo = () => {
  return (
    <div className="">
      <SubLineHeading hasBtn className="mt-8">
        <h2 className="drop-shadow-text tracking-wide-20 text-lg uppercase">
          Orders
        </h2>
      </SubLineHeading>
      <UserInfoField className="mt-6" field="Name" value="John" />
      <UserInfoField className="mt-3" field="Last name" value="Doe" />
      <UserInfoField className="mt-3" field="country" value="Lithunia" />
      <UserInfoField className="mt-3" field="city" value="Vilnius" />
      <UserInfoField
        className="mt-3"
        field="Address"
        value="Gariunu, g. 15"
        infoValues={"values"}
      />
      <Line />
      <UserInfoField
        className="mt-3"
        field="Email"
        value="autostyle@gmail.com"
        linkLabel="Change email"
        linkHref="/change"
      />
      <Line />
      <UserInfoField
        className="mt-3"
        field="Password"
        value="******"
        linkLabel="Change password"
        linkHref="/password"
      />
    </div>
  );
};
