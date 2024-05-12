"use client";
import React from "react";

import { Container, Line } from "@/components/ui/custom";
import { Logo } from "@/components/ui/custom/Logo";
import { cn } from "@/config/utils";
import { useAppSelector } from "@/lib/hooks";

import { DesktopMenu } from "./DesktopMenu";
import { HeaderIcons } from "./HeaderIcons";

interface HeaderProps {
  transparent?: boolean;
}

export const Header = ({ transparent }: HeaderProps) => {
  const modal = useAppSelector((state) => state.modal.value);
  const search = useAppSelector((state) => state.search.active);

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
        { "md:z-30": search },
      )}
    >
      <Container className="flex items-center justify-between gap-4 bg-white py-5 md:gap-12 lg:gap-40">
        <Logo />
        <HeaderIcons />
      </Container>
      <Container>
        <DesktopMenu />
      </Container>
      <Line primary />
    </header>
  );
};
