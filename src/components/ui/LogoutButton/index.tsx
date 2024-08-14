"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components";
import {
    authLogout, 
    globalLoadingOff,
    globalLoadingOn,
    storeLogout, 
    useAppDispatch  } from "@/lib";

const scrollToTop = () => {
    window.scrollTo( { top: 0, behavior: "smooth" } );
};

export const LogoutButton = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        scrollToTop();
        dispatch( globalLoadingOn() );
        dispatch( storeLogout() );
        authLogout();
        dispatch( globalLoadingOff() );
        router.push( "/" );
    };
    return (
        <Button
            variant="outline"
            size="small"
            className="rounded rounded-b-none border-b-transparent uppercase hover:rounded-b hover:border-b"
            onClick={handleLogout}
        >
            Log out
        </Button>
    );
};
