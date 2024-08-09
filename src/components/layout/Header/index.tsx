"use client";
import React from "react";

import { Container, Line, Logo } from "@/components";
import { cn } from "@/config";
import { useAppSelector } from "@/lib";

import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  transparent?: boolean;
}

export const Header = ( { transparent }: HeaderProps ) => {
    const modal = useAppSelector( ( state ) => state.modal.value );
    const search = useAppSelector( ( state ) => state.search.active );

    return (
        <header
            className={cn(
                "relative grid",
                {
                    "bg-white": !transparent,
                },
                {
                    "overflow-hidden": !modal,
                },
                { "md:z-40": search },
            )}
        >
            <Container className="flex items-center justify-between gap-4 bg-white py-5 md:gap-12 lg:gap-40">
                <Logo />
                <MobileMenu />
            </Container>
            <Container>
                <DesktopMenu />
            </Container>
            <Line primary />
        </header>
    );
};
