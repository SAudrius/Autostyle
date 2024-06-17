"use client";

import { Footer, Header, Modal } from "@components/layout";
import { GlobalLoading } from "@components/layout/GlobalLoading";
import React from "react";

import { montserrat } from "@/config/fonts";
import { cn } from "@/config/utils";
import { useAppSelector } from "@/lib/hooks";

interface BodyProps {
  children: React.ReactNode;
}

export const Body = ({ children }: BodyProps) => {
  const modal = useAppSelector((state) => state.modal.value);
  const globalLoading = useAppSelector((state) => state.globalLoading.loading);
  console.log("globalLoading ===", globalLoading);
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
      <Modal />
      {globalLoading && <GlobalLoading />}
      <Header />
      {children}
      <Footer />
    </body>
  );
};
