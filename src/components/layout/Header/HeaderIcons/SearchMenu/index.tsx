"use client";
import React from "react";

import { CancelIcon, Line } from "@/components/ui/custom";
import { cn } from "@/config/utils";
import { useAppSelector } from "@/lib/hooks";

import { SearchInput } from "../Search/SearchInput";

interface SearchMenuProps {
  onClose: () => void;
}

export const SearchMenu = ({ onClose }: SearchMenuProps) => {
  const searchAnimation = useAppSelector(
    (state) => state.search.searchAnimation,
  );
  const search = useAppSelector((state) => state.search.active);
  return (
    <div
      aria-hidden={search ? "false" : "true"}
      className={cn(
        "absolute left-0 right-0 top-[-460px] z-40 h-[460px] translate-x-0 bg-neutral-000 transition duration-300 md:-z-10",
        { "z-40 md:-z-10": search },
        { "-z-20": !search },
        { "translate-y-[0px]": !searchAnimation },
        {
          "translate-y-[460px] md:translate-y-[541px] lg:translate-y-[590px] ":
            searchAnimation,
        },
      )}
    >
      <div className="grid h-full grid-rows-[80px,1fr] md:grid-rows-1">
        <div className="relative grid h-full items-center self-start md:hidden">
          <div className="flex w-full justify-between gap-8 px-5">
            <SearchInput />
            <CancelIcon
              className="grid cursor-pointer self-center px-2"
              onClick={onClose}
            />
          </div>
          <Line className="absolute bottom-0" />
        </div>
        <div className="flex items-center justify-center">
          <h2 className="text-lg">Feature coming soon</h2>
        </div>
      </div>
    </div>
  );
};
