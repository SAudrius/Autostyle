"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { authLogout } from "@/lib/auth/auth";
import { storeLogout } from "@/lib/store/slices/authSlice";

export const LogoutButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(storeLogout());
    authLogout();
    router.push("/");
  };
  return (
    <Button
      variant="outline"
      size="small"
      className="rounded rounded-b-none border-b-transparent hover:rounded-b hover:border-b"
      onClick={handleLogout}
    >
      LOG OUT
    </Button>
  );
};
