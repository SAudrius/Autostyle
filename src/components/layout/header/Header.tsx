import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <div className="container">
      <ul className="absolute flex gap-6 bg-transparent">
        <li className="text-lg">
          <Link href="/">Home</Link>
        </li>
        <li className="text-lg">
          <Link href="brands">Brands</Link>
        </li>
        <li className="text-lg">
          <Link href="products">Products</Link>
        </li>
      </ul>
    </div>
  );
};
