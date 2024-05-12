"use client";
import React from "react";

import { cn } from "@/config/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { cartAnimateOff, cartOff } from "@/lib/store/slices/cartSlice";
import { menuAnimateOff, menuOff } from "@/lib/store/slices/menuSlice";
import { modalAnimateOn, modalOff } from "@/lib/store/slices/modalSlice";
import { searchAnimateOff, searchOff } from "@/lib/store/slices/searchSlice";

export const Modal = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal.value);
  const modalAnimation = useAppSelector((state) => state.modal.modalAnimation);

  const handleModal = () => {
    dispatch(modalAnimateOn());
    dispatch(menuAnimateOff());
    dispatch(cartAnimateOff());
    dispatch(searchAnimateOff());
    new Promise((resolve) => setTimeout(resolve, 300)).then(() => {
      dispatch(modalOff());
      dispatch(menuOff());
      dispatch(cartOff());
      dispatch(searchOff());
    });
  };
  return (
    <div
      aria-hidden={modal ? "false" : "true"}
      onClick={handleModal}
      role="dialog"
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
