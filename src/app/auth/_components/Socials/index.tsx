"use client";
import React from "react";
import { FaGoogle } from "react-icons/fa";

import { authGoogle } from "@/actions";
import { Button } from "@/components"
import { cn } from "@/config";

interface showSocialsProps {
  showSocials?: true | false;
  disabled?: boolean;
  loading?: boolean;
}

export const Socials = ( {
    showSocials = true,
    disabled = false,
    loading = false,
}: showSocialsProps ) => {
    function handleCLick( provider: "google" | "facebook" ) {
        if ( provider === "google" ) {
            authGoogle();
        }
    }
    if ( !showSocials ) return;
    return (
        <div
            className={cn(
                `mt-4 grid grid-cols-1 gap-x-3`,
                loading && [
                    "animate-loading",
                    "from-8%",
                    "to-27%",
                    "bg-gradient-to-l",
                    "from-neutral-400/50",
                    "via-[#ffffff]",
                    "via-15%",
                    "to-neutral-400/50",
                    "bg-[length:200%_100%]",
                ],
            )}
        >
            <Button
                disabled={disabled || loading}
                className="social-icon"
                onClick={() => handleCLick( "google" )}
                size="full"
                variant="secondary"
                type="button"
            >
                <FaGoogle />
            </Button>
            {/* <Button className="social-icon" size="full" variant="secondary">
        <FaFacebook />
      </Button> */}
        </div>
    );
};

export default Socials;
