"use client";
import React from "react";

import { Footer, Header, Modal } from "@/components/layout";
import { montserrat } from "@/config/fonts";
import { cn } from "@/config/utils";
import { useAppSelector } from "@/lib/hooks";

interface BodyProps {
  children: React.ReactNode;
}

export const Body = ({ children }: BodyProps) => {
  console.log("@RERENDE BODY");
  const modal = useAppSelector((state) => state.modal.value);
  console.log("modal ===", modal);

  return (
    <body
      className={cn(`${montserrat.className}`, {
        "overflow-hidden": modal,
      })}
    >
      <Modal />
      <Header />
      {children}
      <Footer />
    </body>
  );
};
