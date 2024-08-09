"use client";

import React from "react";

import { 
    Banner, 
    Footer, 
    GlobalLoading, 
    Header, 
    Modal, 
    Popup
} from "@/components";
import { cn, montserrat } from "@/config";
import { useAppSelector } from "@/lib";

interface BodyProps {
  children: React.ReactNode;
}

export const Body = ( { children }: BodyProps ) => {
    const modal = useAppSelector( ( state ) => state.modal.value );
    const globalLoading = useAppSelector( ( state ) => state.globalLoading.loading );
    return (
        <body
            className={cn(
                `${montserrat.className}`,
                {
                    "overflow-hidden": modal,
                },
                {
                    "overflow-hidden": globalLoading,
                },
            )}
        >
            <Banner/>
            <Modal />
            <Popup />
            {globalLoading && <GlobalLoading />}
            <Header />
            {children}
            <Footer />
        </body>
    );
};
