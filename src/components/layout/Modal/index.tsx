"use client";
import React from "react";

import { cn } from "@/config/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { cartAnimateOff, cartOff } from "@/lib/store/slices/cartSlice";
import { menuAnimateOff, menuOff } from "@/lib/store/slices/menuSlice";
import { modalAnimateOn, modalOff } from "@/lib/store/slices/modalSlice";

export const Modal = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal.value);
  const modalAnimation = useAppSelector((state) => state.modal.modalAnimation);

  const handleModal = () => {
    dispatch(modalAnimateOn());
    dispatch(menuAnimateOff());
    dispatch(cartAnimateOff());
    new Promise((resolve) => setTimeout(resolve, 300)).then(() => {
      dispatch(modalOff());
      dispatch(menuOff());
      dispatch(cartOff());
    });
  };
  return (
    <div
      onClick={handleModal}
      className={cn(
        "absolute -z-20 h-screen w-full bg-neutral-950/35 transition duration-300 ease-in-out",
        {
          "-z-20": !modal,
          "z-30 opacity-100": modal,
        },
        { "opacity-0": modalAnimation },
      )}
    ></div>
  );
};
