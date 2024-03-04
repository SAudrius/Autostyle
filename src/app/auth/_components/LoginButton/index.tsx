"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "redirect" | "modal";
}

export const LoginButton = ({
  children,
  mode = "redirect",
}: LoginButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/login");
  };
  if (mode === "modal") {
    return <span className="text-white">TODO:implement modal</span>;
  }
  return (
    <span onClick={handleClick} className="inline-block cursor-pointer">
      {children}
    </span>
  );
};
