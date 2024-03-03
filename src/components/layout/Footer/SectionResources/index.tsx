import Link from "next/link";

import { montserrat, nunito } from "@/config/fonts";
import { cn } from "@/config/utils";

export const SectionResources = () => {
  return (
    <div className="flex flex-col gap-6 ">
      <p
        className={cn(
          "font-medium uppercase tracking-widest",
          montserrat.className,
        )}
      >
        resources
      </p>
      <ul
        className={cn(
          "grid grid-cols-2 justify-between gap-y-4 text-sm font-light tracking-wide",
          nunito.className,
        )}
      >
        <li>
          <Link href="#">Shipping Information</Link>
        </li>
        <li>
          <Link href="#">Returns & Exchanges</Link>
        </li>
        <li>
          <Link href="#">Privacy Policy</Link>
        </li>
        <li>
          <Link href="#">Terms of Use</Link>
        </li>
        <li>
          <Link href="#">Copyright Policy</Link>
        </li>
        <li>
          <Link href="#">Conditions of Sale</Link>
        </li>
        <li>
          <Link href="#">Need Help?</Link>
        </li>
        <li>
          <Link href="#">Contact Us</Link>
        </li>
      </ul>
    </div>
  );
};
