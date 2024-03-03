import Link from "next/link";

import { montserrat, nunito } from "@/config/fonts";
import { cn } from "@/config/utils";

export const SectionExplore = () => {
  return (
    <div className="mt-8 flex flex-col gap-6 ">
      <p
        className={cn(
          "font-medium uppercase tracking-widest",
          montserrat.className,
        )}
      >
        explore
      </p>
      <div
        className={cn(
          "flex flex-row gap-8 text-sm font-light",
          nunito.className,
        )}
      >
        <Link className="w-40" href="#">
          Search
        </Link>
        <Link className="w-40" href="#">
          Brands
        </Link>
      </div>
    </div>
  );
};
