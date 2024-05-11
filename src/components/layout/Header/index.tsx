"use client";
import React from "react";

import { Container, Line } from "@/components/ui/custom";
import { Logo } from "@/components/ui/custom/Logo";
import { cn } from "@/config/utils";
import { useAppSelector } from "@/lib/hooks";

import { HeaderIcons } from "./HeaderIcons";

interface HeaderProps {
  transparent?: boolean;
}

export const Header = ({ transparent }: HeaderProps) => {
  const modal = useAppSelector((state) => state.modal.value);
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
      )}
    >
      <Container className="flex items-center justify-between gap-4 py-5">
        <Logo />
        <HeaderIcons />
      </Container>
      <Line primary />
    </header>
  );
};
