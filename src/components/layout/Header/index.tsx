import React from "react";

import { Container, Line } from "@/components/ui/custom";
import { Logo } from "@/components/ui/custom/Logo";
import { cn } from "@/config/utils";

import { HeaderIcons } from "./HeaderIcons";

interface HeaderProps {
  transparent?: boolean;
}

export const Header = ({ transparent }: HeaderProps) => {
  return (
    <div
      className={cn("relative grid", {
        "bg-white": !transparent,
      })}
    >
      <Container className="flex items-center justify-between gap-4 py-5">
        <Logo />
        <HeaderIcons />
      </Container>
      <Line primary />
    </div>
  );
};
