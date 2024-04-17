import React from "react";

import { cn } from "@/config/utils";

interface MenuOpenProps {
  onClose: () => void;
  menuOpenOn: boolean;
}

export const MenuOpen = ({ onClose, menuOpenOn }: MenuOpenProps) => {
  return (
    <div
      className={cn(
        "absolute left-0 top-0 z-10 h-screen w-[350px] overflow-x-hidden bg-neutral-000 py-5 transition duration-300",
        { "-z-20 translate-x-[-350px] ": !menuOpenOn },
        {
          "z-40 translate-x-0 opacity-100": menuOpenOn,
        },
      )}
    >
      MenuOpen
    </div>
  );
};
