"use client";
import { Button } from "@components/ui/button";
import { authLogout } from "@lib/auth/auth";
import { useAppDispatch } from "@lib/hooks";
import { storeLogout } from "@lib/store/slices/authSlice";
import {
  globalLoadingOff,
  globalLoadingOn,
} from "@lib/store/slices/globalLoadingSlice";
import { useRouter } from "next/navigation";
import React from "react";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const LogoutButton = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    scrollToTop();
    dispatch(globalLoadingOn());
    dispatch(storeLogout());
    authLogout();
    dispatch(globalLoadingOff());
    router.push("/");
  };
  return (
    <Button
      variant="outline"
      size="small"
      className="rounded rounded-b-none border-b-transparent uppercase hover:rounded-b hover:border-b"
      onClick={handleLogout}
    >
      Log out
    </Button>
  );
};
