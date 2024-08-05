"use client";
import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

export const GlobalLoading = () => {
    return (
        <div className="absolute z-50 flex h-screen w-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-000 to-neutral-100 text-6xl text-red-500">
            <PropagateLoader color="rgb(75 204 210 / var(--tw-text-opacity))" />
        </div>
    );
};
