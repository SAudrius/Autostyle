import Link from "next/link";
import React from "react";

export const DesktopMenu = () => {
  return (
    <nav>
      <ul className="hidden justify-center gap-5 pb-5 pt-2 lg:flex">
        <Link
          className="text-[14px] font-medium uppercase text-neutral-800"
          href="/"
        >
          <li className="">Honda</li>
        </Link>
        <Link
          className="text-[14px] font-medium uppercase text-neutral-800"
          href="/"
        >
          <li className="">Toyota</li>
        </Link>
        <Link
          className="text-[14px] font-medium uppercase text-neutral-800"
          href="/"
        >
          <li className="">Bmw</li>
        </Link>
        <Link
          className="text-[14px] font-medium uppercase text-neutral-800"
          href="/"
        >
          <li className="">Audi</li>
        </Link>
        <Link
          className="text-[14px] font-medium uppercase text-neutral-800"
          href="/"
        >
          <li className="">Volkswagen</li>
        </Link>
        <Link
          className="text-[14px] font-medium uppercase text-neutral-800"
          href="/"
        >
          <li className="">Mercedes</li>
        </Link>
        <Link
          className="text-[14px] font-medium uppercase text-neutral-800"
          href="/"
        >
          <li className="">Nissan</li>
        </Link>
        <Link
          className="text-[14px] font-medium uppercase text-neutral-800"
          href="/"
        >
          <li className="">Volvo</li>
        </Link>
      </ul>
    </nav>
  );
};
