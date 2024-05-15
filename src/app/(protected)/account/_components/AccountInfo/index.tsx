import React from "react";

import { UserInfoField } from "@/app/(protected)/account/_components/Ui/UserInfoField";
import { Line } from "@/components/ui/custom/Line";
import { SubLineHeading } from "@/components/ui/custom/SubLineHeading";

export const AccountInfo = () => {
  return (
    <div className="">
      <SubLineHeading hasBtn className="mt-8">
        <h2 className="text-lg uppercase tracking-wide-20 drop-shadow-text">
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
        value="Example Address"
        infoValues={"values"}
      />
      <Line className="mb-4 mt-4" />
      <UserInfoField
        className="mt-3"
        field="Email"
        value="example@gmail.com"
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
    </div>
  );
};
