import { ChangePasswordPopup } from "@components/popups/ChangePasswordPopup";
import { cn } from "@config/utils";
import { useAppSelector } from "@lib/hooks";
import React from "react";

import { ChangeDetailsPopup } from "@/components/popups/ChangeDetailsPopup";
import { ChangeEmailPopup } from "@/components/popups/ChangeEmailPopup";
import { ErrorPopup } from "@/components/popups/ErrorPopup";

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
