import React from "react";

interface MenuProps {
  onClick: () => void;
}

export const Menu = ({ onClick }: MenuProps) => {
  return (
    <button className="p-2" onClick={onClick}>
      <div className="grid h-[21px] w-8 gap-[6px]">
        <span className="h-[3px] w-full rounded-[1.5px] bg-neutral-900"></span>
        <span className="h-[3px] w-full rounded-[1.5px] bg-neutral-900"></span>
        <span className="h-[3px] w-full rounded-[1.5px] bg-neutral-900"></span>
      </div>
    </button>
  );
};
