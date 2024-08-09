"use client";
import React from "react";

import { cn, montserrat, nunito } from "@/config";
import {
    turnPopupAndModalOn,
    useAppDispatch 
} from "@/lib";

interface UserInfoFieldProps {
  field: string;
  value: string;
  buttonLabel?: string | null;
  haveButton?: boolean;
  className?: string;
}

export const UserInfoField = ( {
    field,
    value,
    buttonLabel = null,
    haveButton,
    className,
}: UserInfoFieldProps ) => {
    const dispatch = useAppDispatch();
    const isEmail = field.toLowerCase() === "email";

    const handleEmailChange = () => {
        turnPopupAndModalOn( dispatch, "changeEmail", 200 );
    };

    const handleDataChange = () => {
        turnPopupAndModalOn( dispatch, "changeDetails", 100 );
    };

    const handlePasswordChange = () => {
        turnPopupAndModalOn( dispatch, "changePassword", 300 );
    };

    return (
        <div>
            <div
                className={cn(
                    "first-letter-uppercase text-lg leading-6 tracking-wide-6",
                    montserrat.className,
                    { lowercase: isEmail },
                    {
                        [className as string]: className,
                    },
                )}
            >
                <span
                    className={cn(
                        "font-medium uppercase tracking-wide-6",
                        nunito.className,
                    )}
                >
                    {field}:{" "}
                </span>
                <p className="first-letter-uppercase inline-block">{value}</p>
            </div>
            {haveButton && (
                <button
                    className={cn(
                        "mt-1 inline-block caption-top tracking-wide-6 underline",
                        montserrat.className,
                    )}
                    onClick={() => {
                        if ( field === 'Password' ) {
                            handlePasswordChange();
                        } else if ( field === 'Email' ) {
                            handleEmailChange();
                        } else {
                            handleDataChange();
                        }
                    }
                    }
                >
                    {buttonLabel}
                </button>
            )}
        </div>
    );
};
