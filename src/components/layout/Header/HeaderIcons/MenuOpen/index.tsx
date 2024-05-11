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
        <ul className="pt-5">
          <Link
            className="cursor-pointer pt-3 text-[14px] uppercase text-white"
            href="/"
          >
            <li className="pt-4">
              Honda
              <Line className="mt-3" />
            </li>
          </Link>
          <Link
            className="cursor-pointer pt-3 text-[14px] uppercase text-white"
            href="/"
          >
            <li className="pt-4">
              Toyota
              <Line className="mt-3" />
            </li>
          </Link>
          <Link
            className="cursor-pointer pt-3 text-[14px] uppercase text-white"
            href="/"
          >
            <li className="pt-4">
              Bmw
              <Line className="mt-3" />
            </li>
          </Link>
          <Link
            className="cursor-pointer pt-3 text-[14px] uppercase text-white"
            href="/"
          >
            <li className="pt-4">
              Audi
              <Line className="mt-3" />
            </li>
          </Link>
          <Link
            className="cursor-pointer pt-3 text-[14px] uppercase text-white"
            href="/"
          >
            <li className="pt-4">
              Volkswagen
              <Line className="mt-3" />
            </li>
          </Link>
          <Link
            className="cursor-pointer pt-3 text-[14px] uppercase text-white"
            href="/"
          >
            <li className="pt-4">
              Mercedes
              <Line className="mt-3" />
            </li>
          </Link>
          <Link
            className="cursor-pointer pt-3 text-[14px] uppercase text-white"
            href="/"
          >
            <li className="pt-4">
              Nissan
              <Line className="mt-3" />
            </li>
          </Link>
          <Link
            className="cursor-pointer pt-3 text-[14px] uppercase text-white"
            href="/"
          >
            <li className="pt-4">
              Volvo
              <Line className="mt-3" />
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};