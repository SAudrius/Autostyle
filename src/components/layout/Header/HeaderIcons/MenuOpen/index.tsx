import Link from "next/link";
import React from "react";

import { CancelIcon, Line } from "@/components/ui/custom";
import { cn } from "@/config/utils";
import { useAppSelector } from "@/lib/hooks";

interface MenuOpenProps {
  onClose: () => void;
}

export const MenuOpen = ({ onClose }: MenuOpenProps) => {
  const menu = useAppSelector((state) => state.menu.value);
  const menuAnimation = useAppSelector((state) => state.menu.menuAnimation);

  return (
    <div
      className={cn(
        "absolute left-0 top-0 z-10 h-screen w-[350px] overflow-x-hidden bg-neutral-800 transition duration-300",
        { "-z-20 ": !menu },
        { "z-40 translate-x-[0px]": menuAnimation },
        { "z-40 translate-x-[-350px] ": !menuAnimation },
        {
          "z-40": menu,
        },
      )}
    >
      <div className="px-4 pt-7">
        <CancelIcon className="cursor-pointer" onClick={onClose} />
        <ul className="pt-6">
          <li className="mt-2">
            <Link className="pt-3 text-[14px] uppercase text-white" href="/">
              Honda
            </Link>
            <Line className="mt-3" />
          </li>
          <li className="mt-2">
            <Link className="pt-3 text-[14px] uppercase text-white" href="/">
              Toyota
            </Link>
            <Line className="mt-3" />
          </li>
          <li className="mt-2">
            <Link className="pt-3 text-[14px] uppercase text-white" href="/">
              Bmw
            </Link>
            <Line className="mt-3" />
          </li>
          <li className="mt-2">
            <Link className="pt-3 text-[14px] uppercase text-white" href="/">
              Audi
            </Link>
            <Line className="mt-3" />
          </li>
          <li className="mt-2">
            <Link className="pt-3 text-[14px] uppercase text-white" href="/">
              Volkswagen
            </Link>
            <Line className="mt-3" />
          </li>
          <li className="mt-2">
            <Link className="pt-3 text-[14px] uppercase text-white" href="/">
              Mercedes
            </Link>
            <Line className="mt-3" />
          </li>
          <li className="mt-2">
            <Link className="pt-3 text-[14px] uppercase text-white" href="/">
              Nissan
            </Link>
            <Line className="mt-3" />
          </li>
          <li className="mt-2">
            <Link className="pt-3 text-[14px] uppercase text-white" href="/">
              Volvo
            </Link>
            <Line className="mt-3" />
          </li>
        </ul>
      </div>
    </div>
  );
};
