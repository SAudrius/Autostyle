"use client";
import React, { useState } from "react";

import { cn } from "@/config/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { off } from "@/lib/store/slices/modalSlice";

export const Modal = () => {
  const [opacity, setOpacity] = useState(false);
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal.value);
  const handleModal = () => {
    console.log("click");
    setOpacity(true);
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      dispatch(off());
    });
  };
  console.log("@RENDER @RENDER @RENDER");
  console.log("opacity ===", opacity);
  return (
    <div
      onClick={handleModal}
      className={cn(
        "absolute -z-20 h-screen w-full bg-neutral-950/35 transition duration-300 ease-in-out",
        {
          "-z-20": !modal,
          "z-30 opacity-100": modal,
        },
        { "opacity-0 delay-200 duration-200": opacity },
      )}
    ></div>
  );
};
