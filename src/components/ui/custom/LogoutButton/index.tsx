"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { authLogout } from "@/lib/auth/auth";
import { useDispatch } from "react-redux";
import { storeLogout } from "@/lib/store/slices/authSlice";
import { useRouter } from "next/navigation";

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
      className="rounded"
      onClick={handleLogout}
    >
      LOG OUT
    </Button>
  );
};
