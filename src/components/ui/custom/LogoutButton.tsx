"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { authLogout } from "@/lib/auth";

export const LogoutButton = () => {
  return (
    <Button
      variant="outline"
      size="small"
      className="rounded"
      onClick={() => authLogout()}
    >
      LOG OUT
    </Button>
  );
};
