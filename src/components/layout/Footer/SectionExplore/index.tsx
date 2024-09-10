import Link from "next/link";

import { cn, nunito  } from "@/config";

export const SectionExplore = () => {
    return (
        <div className="grid grid-cols-2 gap-6 self-start">
            <p className={cn( "col-span-2 font-medium uppercase tracking-widest" )}>
                explore
            </p>
            <ul className="col-span-2 grid grid-cols-2 justify-between gap-y-4 text-sm font-light tracking-wide">
                <li>
                    <Link href="/search">Search</Link>
                </li>
                <li
                    className={cn(
                        "grid grid-cols-2 justify-between gap-y-4 text-sm font-light tracking-wide",
                        nunito.className,
                    )}
                >
                    <Link href="#">Brands</Link>
                </li>
            </ul>
        </div>
    );
};
