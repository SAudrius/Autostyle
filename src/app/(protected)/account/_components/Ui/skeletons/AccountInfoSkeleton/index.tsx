import React from "react";

import { Line, SubLineHeading } from "@/components/ui/custom";

export const AccountInfoSkeleton = () => {
  return (
    <>
      <SubLineHeading logoutButton className="mt-8">
        <h2 className="text-lg uppercase tracking-wide-20 drop-shadow-text">
          Orders
        </h2>
      </SubLineHeading>
      <p className="from-8% to-33% mt-6 h-8 animate-loading rounded-md bg-gray-200 bg-gradient-to-l from-gray-200  via-[#f0f0f0] via-15% to-gray-200 bg-[length:200%_100%]"></p>
      <p className="from-8% to-33% mt-3 h-8 animate-loading rounded-md bg-gray-200 bg-gradient-to-l from-gray-200  via-[#f0f0f0] via-15% to-gray-200 bg-[length:200%_100%]"></p>
      <p className="from-8% to-33% mt-3 h-8 animate-loading rounded-md bg-gray-200 bg-gradient-to-l from-gray-200  via-[#f0f0f0] via-15% to-gray-200 bg-[length:200%_100%]"></p>
      <p className="from-8% to-33% mt-3 h-8 animate-loading rounded-md bg-gray-200 bg-gradient-to-l from-gray-200  via-[#f0f0f0] via-15% to-gray-200 bg-[length:200%_100%]"></p>
      <p className="from-8% to-33% mt-3 h-8 animate-loading rounded-md bg-gray-200 bg-gradient-to-l from-gray-200  via-[#f0f0f0] via-15% to-gray-200 bg-[length:200%_100%]"></p>
      <Line className="mb-4 mt-4" />
      <p className="from-8% to-33% mt-3 h-8 animate-loading rounded-md bg-gray-200 bg-gradient-to-l from-gray-200  via-[#f0f0f0] via-15% to-gray-200 bg-[length:200%_100%]"></p>
      <Line className="mb-4 mt-4" />
      <p className="from-8% to-33% mt-3 h-8 animate-loading rounded-md bg-gray-200 bg-gradient-to-l from-gray-200  via-[#f0f0f0] via-15% to-gray-200 bg-[length:200%_100%]"></p>
    </>
  );
};
