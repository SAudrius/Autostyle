import React from "react";

import { nunito } from "@/config/fonts";
import { cn } from "@/config/utils";

interface SearchInputProps {
  className?: string;
  onFocus?: () => void;
}

export const SearchInput = ({ className, onFocus }: SearchInputProps) => {
  // TODO: search input on key to search and show results
  // const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   console.log("e target ===", e.key);
  // };
  return (
    <>
      <input
        onFocus={onFocus}
        // onKeyUp={(e) => handleKeyUp(e)}
        placeholder="Search your style"
        className={cn(
          "w-full max-w-[480px] px-2 py-2 text-lg outline-none",
          nunito.className,
          className,
        )}
      />
    </>
  );
};
