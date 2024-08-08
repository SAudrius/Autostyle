import "./globals.css";

import { Body } from "@components/ui/custom/Body";
import StoreProvider from "@lib/store/StoreProvider";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Autostyle - find your style",
    description: "Special custom style components",
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout( { children }: RootLayoutProps ) {
    return (
        <StoreProvider>
            <html lang="en">
                <Body>{children}</Body>
            </html>
        </StoreProvider>
    );
}
