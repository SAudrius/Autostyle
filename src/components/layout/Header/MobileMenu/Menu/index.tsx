import React from "react";

interface MenuProps {
  onClick: () => void;
}

export const Menu = ({ onClick }: MenuProps) => {
  return (
    <button
      className="px-1 py-2 sm:px-2 lg:hidden"
      onClick={onClick}
      aria-label="Open menu"
    >
      <div className="grid h-[20px] w-8 gap-[6px]">
        <span className="h-[2.5px] w-full rounded-[1.5px] bg-neutral-900"></span>
        <span className="h-[2.5px] w-full rounded-[1.5px] bg-neutral-900"></span>
        <span className="h-[2.5px] w-full rounded-[1.5px] bg-neutral-900"></span>
      </div>
    </button>
  );
};
