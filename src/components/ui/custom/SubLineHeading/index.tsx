import React from "react";

import { Line, LogoutButton } from "@/components/ui/custom";
import { cn } from "@/config/utils";

interface SubLineHeadingProps {
  children: React.ReactNode;
  className?: string;
  logoutButton?: boolean;
}

export const SubLineHeading = ( {
    children,
    className,
    logoutButton = false,
}: SubLineHeadingProps ) => {
    return (
        <div
            className={cn( "grid ", className, {
                "grid-cols-2": logoutButton,
            } )}
        >
            {!logoutButton && children}
            {logoutButton && <div className="flex items-center">{children}</div>}
            {logoutButton && (
                <div className="flex items-center justify-end">
                    <LogoutButton />
                </div>
            )}
            <Line className={cn( { "col-span-2": logoutButton } )}></Line>
        </div>
    );
};
