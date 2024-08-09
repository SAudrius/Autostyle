import React from "react";

import { UserInfoField } from "@/app/(protected)/account/_components/Ui/UserInfoField";
import { 
    Line, 
    SubLineHeading 
} from "@/components";

import { userInfo } from "./actions/userInfo";

export const AccountInfo = async () => {
    const userData = await userInfo();
    if ( !userData ) {
    // TODO: logout or display message
        return;
    }

    return (
        <div className="lg:mt-[60px]">
            <SubLineHeading logoutButton className="mt-8">
                <h2 className="text-lg uppercase tracking-wide-20 drop-shadow-text">
                    Account
                </h2>
            </SubLineHeading>
            <UserInfoField
                className="mt-6"
                field="Name"
                value={userData.data?.first_name || "Not provided"}
            />
            <UserInfoField
                className="mt-3"
                field="Last name"
                value={userData.data?.last_name || "Not provided"}
            />
            <UserInfoField
                className="mt-3"
                field="country"
                value={userData.data?.country || "Not provided"}
            />
            <UserInfoField
                className="mt-3"
                field="city"
                value={userData.data?.city || "Not provided"}
            />
            <UserInfoField
                className="mt-3"
                field="Address"
                value={userData.data?.address || "Not provided"}
                buttonLabel="Change details"
                haveButton
            />
            <Line className="mb-4 mt-4" />
            <UserInfoField
                className="mt-3"
                field="Email"
                value={userData.data?.email || "Not provided"}
                buttonLabel="Change email"
                haveButton
            />
            <Line className="mb-4 mt-4" />
            <UserInfoField
                className="mt-3"
                field="Password"
                value="********"
                buttonLabel="Change password"
                haveButton
            />
        </div>
    );
};
