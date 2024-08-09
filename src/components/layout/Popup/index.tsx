import React from "react";

import { ChangeDetailsPopup, ChangeEmailPopup, ChangePasswordPopup, ErrorPopup } from "@/components";
import { cn } from "@/config";
import { useAppSelector } from "@/lib";

export const Popup = () => {
    const popupElementKey = useAppSelector(
        ( state ) => state.popup.popupElementKey,
    );
    const popupAnimation = useAppSelector( ( state ) => state.popup.popupAnimation );
    const popup = useAppSelector( ( state ) => state.popup.value );
    return (
        <div
            className={cn(
                "absolute flex h-screen w-full items-center justify-center",
                { "-z-10": !popup },
                { "z-[inherit]": popup },
            )}
        >
            <div
                className={cn(
                    "relative z-50 rounded bg-neutral-50 transition duration-300 animate-in",
                    {
                        "opacity-0": !popupAnimation,
                    },
                    { "opacity-100": popupAnimation },
                )}
            >
                {popupElementKey === "changePassword" && <ChangePasswordPopup />}
                {popupElementKey === "changeEmail" && <ChangeEmailPopup />}
                {popupElementKey === "changeDetails" && <ChangeDetailsPopup />}
                {popupElementKey === 'error' && <ErrorPopup />}
            </div>
        </div>
    );
};
