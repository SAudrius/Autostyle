import Link from "next/link";

import { montserrat, nunito } from "@/config/fonts";
import { cn } from "@/config/utils";

export const SectionResources = () => {
  return (
    <div className="mt-8 flex flex-col gap-6 ">
      <p
        className={cn(
          "font-medium uppercase tracking-widest",
          montserrat.className,
        )}
      >
        resources
      </p>
      <div className=" justify-between text-sm font-light tracking-wide">
        <div className={cn("flex flex-row gap-8", nunito.className)}>
          <Link className="w-40" href="#">
            Shipping Information
          </Link>
          <Link className="w-40" href="#">
            Returns & Exchanges
          </Link>
        </div>
        <div className={cn("mt-4 flex flex-row gap-8", nunito.className)}>
          <Link className="w-40" href="#">
            Privacy Policy
          </Link>
          <Link className="w-40" href="#">
            Terms of Use
          </Link>
        </div>
        <div className={cn("mt-4 flex flex-row gap-8", nunito.className)}>
          <Link className="w-40" href="#">
            Copyright Policy
          </Link>
          <Link className="w-40" href="#">
            Conditions of Sale
          </Link>
        </div>
        <div className={cn("mt-4 flex flex-row gap-8", nunito.className)}>
          <Link className="w-40" href="#">
            Need Help?
          </Link>
          <Link className="w-40" href="#">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};
